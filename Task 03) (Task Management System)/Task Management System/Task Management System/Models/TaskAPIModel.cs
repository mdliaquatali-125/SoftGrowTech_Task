using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Task_Management_System.Models
{
    public class TaskAPIModel
    {
        public int TaskID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime UploadDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime EditDate { get; set; }
        public int EditBy { get; set; }
        public bool IsActive { get; set; }
        public string UploadFile { get; set; }
        public string FileBase64 { get; set; }
        public string FileName { get; set; }

        TaskManagementSystemEntities db = new TaskManagementSystemEntities();

        public async Task<List<TaskAPIModel>> GetTaskList()
        {
            var list = await (from t in db.Tasks
                              where t.IsActive == true
                              select new TaskAPIModel
                              {
                                  TaskID = t.TaskID,
                                  Title = t.Title,
                                  Description = t.Description,
                                  Status = t.Status,
                                  CreatedDate = (DateTime)t.CreatedDate,
                                  UploadDate = (DateTime)t.UploadDate,
                                  IsActive = (bool)t.IsActive,
                                  UploadFile = t.UploadFile
                              }).ToListAsync();

            foreach (var item in list)
            {
                if (!string.IsNullOrEmpty(item.UploadFile))
                {
                    string fileName = Path.GetFileName(item.UploadFile); // 🔥 important
                    string fullPath = HttpContext.Current.Server.MapPath("~/Uploads/" + fileName);

                    if (!System.IO.File.Exists(fullPath))
                    {
                        item.UploadFile = null;
                    }
                    else
                    {
                        item.UploadFile = item.UploadFile; // clean return
                    }
                }
            }

            return list;
        }

        public async Task<int> AddTask()
        {
            int result = 0;

            var exist = await db.Tasks.Where(x => x.Title == Title.ToLower()).CountAsync();

            if (exist > 0)
            {
                result = 0;
                return result;
            }

            Task t = new Task();

            t.Title = Title;
            t.Description = Description;
            t.Status = Status;
            t.UploadDate = UploadDate;
            t.CreatedDate = DateTime.Now;
            t.CreatedBy = HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString();
            t.IsActive = true ;

            if (!string.IsNullOrEmpty(FileBase64))
            {
                var base64Data = FileBase64.Split(',')[1];
                byte[] bytes = Convert.FromBase64String(base64Data);

                string extension = Path.GetExtension(FileName);

                if (!string.IsNullOrEmpty(extension))
                {
                    string folderPath = HttpContext.Current.Server.MapPath("~/Uploads/");

                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }

                    string fileName = Title + extension;
                    string fullPath = Path.Combine(folderPath, fileName);

                    File.WriteAllBytes(fullPath, bytes);

                    t.UploadFile = "/Uploads/" + fileName;
                }
            }

            db.Tasks.Add(t);
            await db.SaveChangesAsync();
            result = 1;
            return result;
        }

        public async Task<int> DeleteTask(int id)
        {
            int result = 0;

            var exist = await db.Tasks.Where(x => x.TaskID == id).FirstOrDefaultAsync();

            if (exist != null)
            {
                exist.IsActive = false;
                await db.SaveChangesAsync();
                result = 1;
                return result;
            }
            else
            {
                result = 0;
                return result;
            }
        }

        public async Task<TaskAPIModel> EditTask(int id)
        {
            var exist = await db.Tasks.Where(x => x.TaskID == id).FirstOrDefaultAsync();

            if (exist == null)
            {
                return null;
            }

            TaskAPIModel t = new TaskAPIModel();

            t.TaskID = exist.TaskID;
            t.Title = exist.Title;
            t.Description = exist.Description;
            t.Status = exist.Status;
            t.UploadDate = (DateTime)exist.UploadDate;
            t.Status = exist.Status;
            t.UploadFile = exist.UploadFile;
            return t;
        }

        public async Task<int> UpdateTask()
        {
            int result = 0;

            var exist = await db.Tasks.Where(x => x.TaskID == TaskID).FirstOrDefaultAsync();

            if (exist == null)
            {
                result = 0;
                return result;
            }

            // Check duplicate username except current user
            var existTitleName = await db.Tasks.Where(x => x.Title.ToLower() == Title.ToLower() && x.TaskID != TaskID).CountAsync();

            if (existTitleName > 0)
            {
                result = 2;
                return result;
            }
            else
            {
                exist.Title = Title;
                exist.Description = Description;
                exist.Status = Status;
                exist.UploadDate = UploadDate;
                exist.Status = Status;
                exist.EditBy = HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString();
                exist.EditDate  = DateTime.Now;

                if (!string.IsNullOrEmpty(FileBase64))
                {
                    var base64Data = FileBase64.Split(',')[1];
                    byte[] bytes = Convert.FromBase64String(base64Data);

                    string extension = Path.GetExtension(FileName);

                    if (!string.IsNullOrEmpty(extension))
                    {
                        string folderPath = HttpContext.Current.Server.MapPath("~/Uploads/");

                        if (!Directory.Exists(folderPath))
                        {
                            Directory.CreateDirectory(folderPath);
                        }

                        // ✅ DELETE OLD FILE FROM DB PATH
                        if (!string.IsNullOrEmpty(exist.UploadFile))
                        {
                            string oldFullPath = HttpContext.Current.Server.MapPath(exist.UploadFile);

                            if (File.Exists(oldFullPath))
                            {
                                File.Delete(oldFullPath);
                            }
                        }

                        // ✅ SAVE NEW FILE
                        string fileName = Title + extension;
                        string fullPath = Path.Combine(folderPath, fileName);

                        File.WriteAllBytes(fullPath, bytes);

                        exist.UploadFile = "/Uploads/" + fileName;
                    }
                }

                await db.SaveChangesAsync();
                result = 1;
            }
            return result;
        }

        public async Task<int> TotalTaskCount()
        {
            int count = await db.Tasks.Where(t => t.IsActive == true).CountAsync();
            return count;
        }

        public async Task<int> TotalTaskPendingCount()
        {
            int count = await db.Tasks.Where(t => t.Status == "Pending" && t.IsActive == true).CountAsync();
            return count;
        }
        public async Task<int> TotalTaskInProgressCount()
        {
            int count = await db.Tasks.Where(t => t.Status == "In Progress" && t.IsActive == true).CountAsync();
            return count;
        }
        public async Task<int> TotalTaskCompleteCount()
        {
            int count = await db.Tasks.Where(t => t.Status == "Completed" && t.IsActive == true).CountAsync();
            return count;
        }
    }
}
