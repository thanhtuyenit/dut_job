using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("Role")]
    public class Role : BaseEntity
    {
        public String Name { get; set; }

        [JsonIgnore]
        public ICollection<User> Users { get; set; }
    }
}
