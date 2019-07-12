using job_dut.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class PostDTO
    {
        public long ID { get; set; }
        public string Title { get; set; }
        public string Reason { get; set; }
        public string Description { get; set; }
        public string Experience { get; set; }
        public string Benefit { get; set; }
        public DateTime DateExpire { get; set; }
        public string Salary { get; set; }
        public long NumberView { get; set; }
        public long JobTypeID { get; set; }
        public long FacultyID { get; set; }

        public bool IsDisplay { get; set; }

        public JobType JobType { get; set; }

        public Faculty Faculty { get; set; }
        //public List<Faculty> Faculties { get; set; }

        public List<KeySkill> Skills { get; set; }

        [JsonProperty("company")]
        public PostCompany PostCompany { get; set; }
    }
}
