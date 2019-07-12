using job_dut.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class CompanyDTO
    {
        public string Username { get; set; } //username to login of the company
        public long ID { get; set; } //id of company
        public string Name { get; set; }
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
        public string EmployeeFrom { get; set; }
        public string EmployeeTo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        
        public OvertimeType OvertimeType { get; set; }

        public Faculty Faculty { get; set;}

        public List<KeySkill> Skills { get; set; }
    }
}
