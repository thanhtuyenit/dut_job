using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.OvertimeTypes
{
    public interface IOvertimeTypeService
    {
        List<OvertimeType> GetAll();
    }
}
