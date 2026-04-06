using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Web;
using System.Web.Mvc;

namespace Task_Management_System.Utilities
{
    public class DataHelper
    {
        public static int DaysExpireRemaining { get; internal set; }
        public static bool IsNearExpire { get; internal set; }

        public static bool Set_Session(UserMaster checkUser)
        {

            HttpContext.Current.Session["UserName"] = checkUser.UserName;
            HttpContext.Current.Session["UserId"] = checkUser.UserID;
            HttpContext.Current.Session["IsLoggedIn"] = true;

            return true;
        }

        public static bool delete_Session()
        {
            HttpContext.Current.Session.Clear();
            return true;
        }

    }
}