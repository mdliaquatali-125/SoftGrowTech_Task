using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Task_Management_System.Models;

namespace Task_Management_System.Controllers
{
    public class LoginController : Controller
    {
        //ErrorLogMasterModel
        ErrorLogMasterModel elm = new ErrorLogMasterModel();

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Logout()
        {
            LoginAPIModel.Logout();
            return RedirectToAction("Index");

        }
    }
}