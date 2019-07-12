using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace job_dut.Commons
{
    public class CountString
    {
        public CountString()
        {
        }

        public static int CountStr(string str)
        {
            str = Regex.Replace(str.Trim(), @"\s+", " ");
            string[] words = str.Split(' ');
            return words.Length;
        }

    }
}
