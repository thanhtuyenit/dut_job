using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("PostKeySkill")]
    public class PostKeySkill
    {
        public long PostID { get; set; }

        [JsonIgnore]
        public Post Post { get; set; }

        public long KeySkillID { get; set; }

        [JsonIgnore]
        public KeySkill KeySkill { get; set; }

    }
}
