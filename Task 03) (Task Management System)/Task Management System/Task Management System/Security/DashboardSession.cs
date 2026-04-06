using Task_Management_System.Models;
using Task_Management_System.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Task_Management_System.Security
{
    public class DashboardSession : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                if (HttpContext.Current.Session["UserID"] == null ||
                    HttpContext.Current.Session["UserName"] == null ||
                    HttpContext.Current.Session["IsLoggedIn"] == null)
                {

                    filterContext.Result = new RedirectResult("/Login/Index");

                }
                else
                {
                    base.OnActionExecuting(filterContext);
                }
            }

            catch (Exception ex)
            {
                //ErrorLogMasterModel
                ErrorLogMasterModel elm = new ErrorLogMasterModel();
                elm.Add(
                       ex.Message == null ? "No Message" : ex.Message,
                       ex.InnerException == null ? "No Inner Exception" : ex.InnerException.Message,
                       DateTime.Now,
                       HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString(),
                       "DashboardSession", "OnActionExecuting"
                   );
                filterContext.Result = new RedirectResult("/ErrorLogMaster/Index");
            }

         }
    }
}