using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("Profile")]
    public class ProfileUser : BaseEntity
    {
        public long UserID { get; set; }
        public string Fullname { get; set; }
        public DateTime DOB { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Avatar { get; set; }
        public string AboutMe { get; set; }
        public string CVLink { get; set; }
        public string Website { get; set; }
        public long FacultyID { get; set; }

        [ForeignKey("UserID")]
        public User User { get; set; }
        [ForeignKey("FacultyID")]
        public Faculty Faculty { get; set;}

       
    }
}
