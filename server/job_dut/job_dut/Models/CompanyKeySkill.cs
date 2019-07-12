using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("CompanyKeySkill")]
    public class CompanyKeySkill
    {
        public long CompanyID{ get; set; }

        [JsonIgnore]
        public Company Company { get; set; }

        public long KeySkillID { get; set; }

        [JsonIgnore]
        public KeySkill KeySkill { get; set; }
    }
}
