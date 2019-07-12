using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("User")]
    public class User : BaseEntity
    {
        public User()
        {
            ProfileUsers = new HashSet<ProfileUser>();
            UserKeySkills = new HashSet<UserKeySkill>();
            Companies = new HashSet<Company>();
        }
        public string Username { get; set; } //it's is an email address.
        public string Password { get; set; }
        public long RoleID { get; set; }
        public bool IsActive { get; set; }
        public bool IsReceiveEmail { get; set; }

        [NotMapped]
        [JsonIgnore]
        public string Fullname { get; set;}

        [NotMapped]
        [JsonIgnore]
        public Faculty Faculty { get; set; }

        [JsonIgnore]
        [ForeignKey("RoleID")]
        public virtual Role Role { get; set;}

        [JsonIgnore]
        public virtual ICollection<ProfileUser> ProfileUsers { get; set; }

        [JsonIgnore]
        public virtual ICollection<UserKeySkill> UserKeySkills { get; set;}

        [JsonIgnore]
        public virtual ICollection<Company> Companies { get; set; }

        [JsonIgnore]
        public ICollection<UserJobApply> UserJobApplies { get; set; }
    }
}
