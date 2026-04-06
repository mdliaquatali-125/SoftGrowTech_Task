using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_Management_System.Models
{
    public class ErrorLogMasterModel
    {
        public int ErrorID { get; set; }
        public string ErrorMessage { get; set; }
        public DateTime ErrorDateTime { get; set; }
        public string UserName { get; set; }
        public string ControllerName { get; set; }
        public string MethodName { get; set; }
        public string InnerErrorMessage { get; set; }

        public bool Add(string ErrorMessage, string ErrorInnerException, DateTime ErrorDateTime, string UserName, string ControllerName, string MethodName)
        {
            try
            {
                using (TaskManagementSystemEntities db = new TaskManagementSystemEntities())
                {
                    ErrorLogMaster errorLog = new ErrorLogMaster();
                    errorLog.ErrorMessage = ErrorMessage;
                    if (ErrorInnerException != null)
                    {
                        errorLog.InnerErrorMessage = ErrorInnerException;
                    }
                    errorLog.ErrorDateTime = ErrorDateTime;
                    errorLog.UserName = UserName;
                    errorLog.ControllerName = ControllerName;
                    errorLog.MethodName = MethodName;
                    db.ErrorLogMasters.Add(errorLog);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                ErrorLogMasterModel elm = new ErrorLogMasterModel();
                elm.Add(
                       ex.Message == null ? "No Message" : ex.Message,
                       ex.InnerException == null ? "No Inner Exception" : ex.InnerException.Message,
                       DateTime.Now,
                       HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString(),
                       "ErrorLogMasterModel", "Add"
                );
            }

            return false;

        }
    }
}