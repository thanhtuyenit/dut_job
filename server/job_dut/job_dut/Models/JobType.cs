using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("JobType")]
    public class JobType : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
