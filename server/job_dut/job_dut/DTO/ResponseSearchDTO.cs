using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.DTO
{
    public class ResponseSearchDTO
    {
        public ResponseCompanySearchDTO CompanySearch {get; set; }

        public ResponseJobSearchDTO PostSearch {get; set; }
    }
}
