using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class ResponseCompanySearchDTO
    {
        public int Total { get; set; }
        public List<CompanyDTO> Company { get; set; }
    }
}
