using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.PagedList
{
    public class PagingOutput
    {
        public PagingHeader Paging { get; set; }
        public List<Object> Items { get; set; }
    }
}
