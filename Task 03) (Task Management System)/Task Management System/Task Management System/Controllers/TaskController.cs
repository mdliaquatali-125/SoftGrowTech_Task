using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Task_Management_System.Security;

namespace Task_Management_System.Controllers
{
     [DashboardSession]
    public class TaskController : Controller
    {
        // GET: Task
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Add()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Edit(int? TaskID)
        {
            ViewBag.TaskID = TaskID;
            return View();
        }
    }
}