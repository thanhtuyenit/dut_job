using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace job_dut.Commons
{
    public class CustomString
    {
        public CustomString()
        {

        }

        public static string CustomStr(String str)
        {
            if(str != null)
            {
                return Regex.Replace(str.Trim(), @"\s+", " ");
            }
            else
            {
                return null;
            }
           
        }
    }
}
