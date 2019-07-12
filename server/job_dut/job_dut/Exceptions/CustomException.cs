using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Exceptions
{
    public class CustomException : Exception
    {
        public string Code { get; }

        public CustomException(string code, string message, params object[] args) : this(null, code, message, args)
        {
        }

        public CustomException(Exception innerException, string code, string message, params object[] args) : base(string.Format(message, args), innerException)
        {
            Code = code;
        }
    }
}
