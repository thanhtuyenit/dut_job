using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class ResponseJobSearchDTO
    {
        public int Total { get; set; }
        public List<PostDTO> Post { get; set; }
    }
}
