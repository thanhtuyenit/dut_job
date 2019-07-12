using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Models
{
    [Table("Faculty")]
    public class Faculty : BaseEntity
    {
        public string Name { get; set; }

        public string Avatar { get; set; }

        public string Description { get; set; }

        [JsonIgnore]
        public virtual ICollection<ProfileUser> ProfileUsers { get; set;}

        [JsonIgnore]
        public ICollection<Company> Companies { get; set; }

        //[JsonIgnore]
        //public ICollection<PostFaculty> PostFaculties { get; set; }
    }
}
