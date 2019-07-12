using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class CompanyAddDTO
    {
        public string Username { get; set; } ////it's is an email address.
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; } //email public: any body can watch.
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

        public List<KeySkill> Skills { get; set; }

    }
}
