﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("OvertimeType")]
    public class OvertimeType : BaseEntity
    {
        public string Name { get; set; }
    }
}
