using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("KeySkill")]
    public class KeySkill : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        [JsonIgnore]
        public ICollection<UserKeySkill> UserKeySkills { get; set;}

        [JsonIgnore]
        public ICollection<CompanyKeySkill> CompanyKeySkills { get; set; }

        [JsonIgnore]
        public ICollection<PostKeySkill> PostKeySkills { get; set; }

    }
}
