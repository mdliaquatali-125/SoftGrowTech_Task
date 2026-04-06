using System;
using System.Security.Policy;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Task_Management_System.Models;
using Task_Management_System.Utilities;

namespace Task_Management_System.API
{
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        ErrorLogMasterModel elm = new ErrorLogMasterModel();

        [HttpPost]
        [Route("login")]
        public async Task<IHttpActionResult> Login(LoginAPIModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int result = await model.CheckLogin();

                    if (result == 1)
                    {
                        string token = JwtHelper.GenerateToken(model.UserName);
                        return Json(new
                        {
                            Status = "Success",
                            Message = "User login successfully.",
                            URL = "/dashboard/Index",
                            Token = token,
                        });
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "Error",
                            Message = "Plese enter valid credentials.",
                            URL = "/Login/Index"
                        });
                    }
                }
                else
                {
                    return Json(new
                    {
                        Status = "Error",
                        Message = "Validation failed.",
                        URL = "/Login/Index"
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
                     "LoginAPI", "Login"
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