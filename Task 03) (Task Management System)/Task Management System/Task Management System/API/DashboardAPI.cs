using System;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Task_Management_System.Models;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;
using RoutePrefixAttribute = System.Web.Http.RoutePrefixAttribute;

namespace Task_Management_System.API
{
    [Authorize]
    [RoutePrefix("api/dashboard")]
    public class DashboardController : ApiController
    {
        ErrorLogMasterModel elm = new ErrorLogMasterModel();

        [HttpGet]
        [Route("GetTaskCount")]
        public async Task<IHttpActionResult> GetTaskCount()
        {
            try
            {
                var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
                string username = identity?.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;

                TaskAPIModel t = new TaskAPIModel();
                var total = await t.TotalTaskCount();
                var pending = await t.TotalTaskPendingCount();
                var inProgress = await t.TotalTaskInProgressCount();
                var complete = await t.TotalTaskCompleteCount();

                var response = new
                {
                    Status = "Success",
                    Data = new
                    {
                        TotalTask = total,
                        PendingTask = pending,
                        InProgressTask = inProgress,
                        CompleteTask = complete
                    }
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                elm.Add(
                       ex.Message == null ? "No Message" : ex.Message,
                       ex.InnerException == null ? "No Inner Exception" : ex.InnerException.Message,
                       DateTime.Now,
                       HttpContext.Current.Session["UserName"] == null ? "UnknownUser" : HttpContext.Current.Session["UserName"].ToString(),
                       "DashboardAPI", "GetTaskCount"
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