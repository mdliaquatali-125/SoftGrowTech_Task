using System;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Task_Management_System.Models;

namespace Task_Management_System.API
{
    [RoutePrefix("api/task")]
    public class TasksController : ApiController
    {
        ErrorLogMasterModel elm = new ErrorLogMasterModel();

        //✅ GET all tasks
        [HttpGet]
        [Route("GetAllTasks")]
        public async Task<IHttpActionResult> GetAllTasks()
        {
            try
            {
                TaskAPIModel t = new TaskAPIModel();
                var result = await t.GetTaskList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                elm.Add(
                       ex.Message == null ? "No Message" : ex.Message,
                       ex.InnerException == null ? "No Inner Exception" : ex.InnerException.Message,
                       DateTime.Now,
                       HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString(),
                       "TaskAPI", "GetAllTasks"
                   );
                return Json(new
                {
                    Status = "CatchError",
                    URL = "/ErrorLogMaster/Index"
                });
            }
        }
       
        // ✅ POST (Add Task)
        [HttpPost]
        [Route("AddTask")]
        public async Task<IHttpActionResult> AddTask(TaskAPIModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int result = await model.AddTask();

                    if (result == 1)
                    {
                        return Json(new
                        {
                            Status = "Success",
                            Message = "Task added successfully.",
                            URL = "/Task/Add"
                        });
                    }
                    else if (result == 0)
                    {
                        return Json(new
                        {
                            Status = "Error",
                            Message = "Task already exists.",
                        });
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "Error",
                            Message = "Failed to add task. Please try again.",
                        });
                    }
                }
                else
                {
                    return Json(new
                    {
                        Status = "Error",
                        Message = "Validation failed.",
                    });
                }
            }
            catch (Exception ex)
            {
                elm.Add(
                       ex.Message == null ? "No Message" : ex.Message,
                       ex.InnerException == null ? "No Inner Exception" : ex.InnerException.Message,
                       DateTime.Now,
                       HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString(),
                       "TaskAPI", "AddTask"
                   );
                return Json(new
                {
                    Status = "CatchError",
                    URL = "/ErrorLogMaster/Index"
                });
            }
        }

        // ✅ DELETE Task
        [HttpDelete]
        [Route("{id}")]
        public async Task<IHttpActionResult> DeleteTask(int id)
        {
            try
            {
                TaskAPIModel t = new TaskAPIModel();

                int result = await t.DeleteTask(id);
                if (result == 1)
                {
                    return Json(new
                    {
                        Status = "Success",
                        Message = "Task deleted successfully.",
                        URL = "/Task/Index"
                    });
                }
                else
                {
                    return Json(new
                    {
                        Status = "Error",
                        Message = "Failed to delete Task. Please try again.",
                        URL = "/Task/Index"
                    });
                }
            }
            catch (Exception ex)
            {
                elm.Add(
                       ex.Message == null ? "No Message" : ex.Message,
                       ex.InnerException == null ? "No Inner Exception" : ex.InnerException.Message,
                       DateTime.Now,
                       HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString(),
                       "TaskAPI", "DeleteTask"
                   );
                return Json(new
                {
                    Status = "CatchError",
                    URL = "/ErrorLogMaster/Index"
                });
            }
        }

        // ✅ GET task by id
        [HttpGet]
        [Route("{GetTaskById}")]
        public async Task<IHttpActionResult> GetTask(int id)
        {
            try
            {
                TaskAPIModel t = new TaskAPIModel();
                var result = await t.EditTask(id);
                return Ok(new
                {
                    Status = "Success",
                    Data = result
                });
            }
            catch (Exception ex)
            {
                elm.Add(
                      ex.Message == null ? "No Message" : ex.Message,
                      ex.InnerException == null ? "No Inner Exception" : ex.InnerException.Message,
                      DateTime.Now,
                      HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString(),
                      "TaskAPI", "GetTask"
                  );
                return Json(new
                {
                    Status = "CatchError",
                    URL = "/ErrorLogMaster/Index"
                });
            }
        }

        // ✅ POST (UpdateTask Task)
        [HttpPost]
        [Route("UpdateTask")]
        public async Task<IHttpActionResult> UpdateTask(TaskAPIModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int result = await model.UpdateTask();

                    if (result == 1)
                    {
                        return Json(new
                        {
                            Status = "Success",
                            Message = "Task updated successfully.",
                            URL = "/Task/Index"
                        });
                    }
                    else if (result == 2)
                    {
                        return Json(new
                        {
                            Status = "Error",
                            Message = "Task already exists.",
                        });
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "Error",
                            Message = "Failed to update task. Please try again.",
                        });
                    }
                }
                else
                {
                    return Json(new
                    {
                        Status = "Error",
                        Message = "Validation failed.",
                    });
                }
            }
            catch (Exception ex)
            {
                elm.Add(
                       ex.Message == null ? "No Message" : ex.Message,
                       ex.InnerException == null ? "No Inner Exception" : ex.InnerException.Message,
                       DateTime.Now,
                       HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString(),
                       "TaskAPI", "UpdateTask"
                   );
                return Json(new
                {
                    Status = "CatchError",
                    URL = "/ErrorLogMaster/Index"
                });
            }
        }
    }
}