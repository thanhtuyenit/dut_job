using job_dut.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class UserJobApplyDTO
    {
        public long UserID { get; set; }
       
        //public User User { get; set; }

        public long PostID { get; set; }
       
        public string JobName { get; set; }

        public string CoverLetter { get; set; }

        [JsonProperty("dateApplied")]
        public DateTime CreatedAt { get; set; }

        public bool AcceptView { get; set; }
    }
}
