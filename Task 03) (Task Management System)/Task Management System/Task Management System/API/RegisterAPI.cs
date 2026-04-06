using System;
using System.Security.Policy;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Task_Management_System.Models;
using Task_Management_System.Utilities;

namespace Task_Management_System.API
{
    [RoutePrefix("api/register")]
    public class RegisterController : ApiController
    {
        ErrorLogMasterModel elm = new ErrorLogMasterModel();

        [HttpPost]
        [Route("register")]
        public async Task<IHttpActionResult> Register(LoginAPIModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int result = await model.Register();

                    if (result == 1)
                    {
                        string token = JwtHelper.GenerateToken(model.UserName);
                        return Json(new
                        {
                            Status = "Success",
                            Message = "User register successfully.",
                            URL = "/Login/Index",
                            Token = token,
                        });
                    }
                    else if (result == -1)
                    {
                        return Json(new
                        {
                            Status = "Error",
                            Message = "User email already exists."
                        });
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "Error",
                            Message = "Something went wrong."
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
                     "RegisterAPI", "Register"
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