using job_dut.Databases;
using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.OvertimeTypes
{
    public class OvertimeTypeService : IOvertimeTypeService
    {
        public DataContext DataContext { get; }
        public OvertimeTypeService(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        public List<OvertimeType> GetAll()
        {
            return DataContext.OvertimeTypes.Where(overtimeType => !overtimeType.DeleteFlag).ToList();
        }
    }
}
