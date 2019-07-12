using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class PostCompany
    {
        public long ID { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }

        public string Avatar { get; set; }
        public string Title { get; set; }

        // public Faculty Faculty { get; set; }

    }
}
