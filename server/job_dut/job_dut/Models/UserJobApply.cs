using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("UserJobApply")]
    public class UserJobApply
    {
        public long UserID { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        public long PostID { get; set; }

        [JsonIgnore]
        public Post Post { get; set; }

        public string CoverLetter { get; set; }

        public DateTime CreatedAt { get; set; }

        
    }
}
