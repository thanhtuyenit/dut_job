using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Responses
{
    public class APIResponses
    {
        [JsonProperty("code")]
        public int Code { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("data")]
        public Object Data { get; set; }

        //public APIResponses(int code, string message, Object data)
        //{
        //    Code = code;
        //    Message = message;
        //    Data = data;
        //}
    }
}
