using Task_Management_System.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Data.Entity;

namespace Task_Management_System.Models
{
    public class LoginAPIModel
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime EditDate { get; set; }
        public string EditBy { get; set; }
        public string UserEmail { get; set; }
        public string UserContact { get; set; }
        public string UserAddress { get; set; }

        TaskManagementSystemEntities db = new TaskManagementSystemEntities();
        
        public async Task<int> CheckLogin()
        {
            int result = 0;

            string hashedPassword = PasswordHelper.HashPassword(UserPassword);

            var CheckUser = await (from um in db.UserMasters
                                   where um.UserName == UserName &&
                                   um.UserPassword == hashedPassword
                                   && um.IsActive == true
                                   select um).SingleOrDefaultAsync();

            if (CheckUser != null)
            {
                DataHelper.Set_Session(CheckUser);
                result = 1;
            }
            else
            {
                result = 0;
            }
            return result;
        }

        public static bool Logout()
        {
            return DataHelper.delete_Session();
        }

        public async Task<int> Register()
        {
            int result = 0;

            var exist = await db.UserMasters.Where(x => x.UserEmail == UserEmail.ToLower()).CountAsync();

            if (exist > 0)
            {
                result = -1;
                return result;
            }

            UserMaster um = new UserMaster();

            um.UserName = UserName;
            um.UserPassword = PasswordHelper.HashPassword(UserPassword);
            um.UserRole = "User";
            um.IsActive = true;
            um.CreatedDate = DateTime.Now;
            um.CreatedBy = HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString();
            um.UserEmail = UserEmail;
            um.UserContact = UserContact;
            um.UserAddress = UserAddress;
            db.UserMasters.Add(um);
            await db.SaveChangesAsync();

            result = 1;
            
            return result;
        }
    }
}