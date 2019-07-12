using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("Post")]
    public class Post : BaseEntity
    {
        public Post()
        {
            PostKeySkills = new HashSet<PostKeySkill>();
            UserJobApplies = new HashSet<UserJobApply>();
        }
        public long CompanyID { get; set; }
        public string Title { get; set; }
        public string Reason { get; set; }
        public string Description { get; set; }
        public string Experience { get; set; }
        public string Benefit { get; set; }
        public DateTime DateExpire { get; set; }
        public string Salary { get; set; }
        public bool IsDisplay { get; set; }
        public long NumberView { get; set; }
        public long JobTypeID { get; set;}
        public long FacultyID { get; set; }

        [JsonIgnore]
        [ForeignKey("CompanyID")]
        public virtual Company Company { get; set; }

        [JsonIgnore]
        [ForeignKey("JobTypeID")]
        public virtual JobType JobType { get; set; }

        [JsonIgnore]
        [ForeignKey("FacultyID")]
        public virtual Faculty Faculty { get; set; }

        [JsonIgnore]
        public ICollection<PostKeySkill> PostKeySkills { get; set; }

        [JsonIgnore]
        public ICollection<UserJobApply> UserJobApplies { get; set; }
    }
}
