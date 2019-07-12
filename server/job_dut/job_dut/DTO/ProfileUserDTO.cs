using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace job_dut.DTO
{
    public class ProfileUserDTO
    {
        public long UserID { get; set; }
        public string Username { get; set; }
        public bool IsActive { get; set; }
        public bool IsReceiveEmail { get; set; }
        public string Fullname { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DOB { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Avatar { get; set; }
        public string AboutMe { get; set; }
        public string CVLink { get; set; }
        public string Website { get; set; }

        public Role Role { get; set; }
        public Faculty Faculty { get; set; }
        public List<KeySkill> Skills { get; set; }
    }
}
