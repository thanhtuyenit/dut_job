using job_dut.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class TokenDTO
    {
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("role")]
        public Role Role { get; set; }
        [JsonProperty("token")]
        public string Token { get; set; }
    }
}
