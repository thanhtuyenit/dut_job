using job_dut.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class UserDTO
    {
        [JsonProperty("userID")]
        public long ID { get; set; }
        public string Username { get; set; }
        public bool IsActive { get; set; }
        public bool IsReceiveEmail { get; set; }
        public RoleDTO Role { get; set; }
        public string FullName { get; set; }
        public Faculty Faculty { get; set; }

    }
}
