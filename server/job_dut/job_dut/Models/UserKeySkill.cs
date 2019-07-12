using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("UserKeySkill")]
    public class UserKeySkill
    {
        public long UserID { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        public long KeySkillID { get; set; }

        [JsonIgnore]
        public KeySkill KeySkill { get; set; }

        [JsonIgnore]
        public DateTime CreatedAt { get; set; }
        [JsonIgnore]
        public DateTime UpdatedAt { get; set; }
        [JsonIgnore]
        public bool DeleteFlag { get; set; }
    }
}
