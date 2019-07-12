using job_dut.Databases;
using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.TypeJobServices
{
    public class JobTypeService : IJobTypeService
    {
        public DataContext DataContext { get; set; }

        public JobTypeService(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        public List<JobType> GetAll()
        {
            return DataContext.JobTypes.Where(t => !t.DeleteFlag).ToList();
        }
    }
}
