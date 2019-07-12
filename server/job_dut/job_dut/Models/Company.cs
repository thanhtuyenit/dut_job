using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("Company")]
    public class Company : BaseEntity
    {
        public Company()
        {
            CompanyKeySkills = new HashSet<CompanyKeySkill>();
        }
        public long UserID { get; set; }
        public string Name { get; set;}
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public string Backgroud1 { get; set; }
        public string Backgroud2 { get; set; }
        public string Backgroud3 { get; set; }
        public string Website { get; set; }
        public string Facebook { get; set; }
        public string TimeWorkFrom { get; set; }
        public string TimeWorkTo { get; set; }
        public long OvertimeTypeID { get; set; }
        public string EmployeeFrom { get; set; }
        public string EmployeeTo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public long FacultyID { get; set; }
        public bool IsActive { get; set;}

        [JsonIgnore]
        [ForeignKey("UserID")]
        public User User { get; set;}

        [JsonIgnore]
        [ForeignKey("OvertimeTypeID")]
        public OvertimeType OvertimeType { get; set;}

        [JsonIgnore]
        [ForeignKey("FacultyID")]
        public Faculty Faculty { get; set; }

        [JsonIgnore]
        public ICollection<CompanyKeySkill> CompanyKeySkills { get; set; }
    }
}
