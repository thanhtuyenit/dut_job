using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Databases;
using job_dut.DTO;

namespace job_dut.Services.Dashboards
{
    public class DashboardService : IDashboardService
    {
        public DataContext DataContext { get;}
        public DashboardService(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        public DashboardDTO DashboardInfor()
        {
            return new DashboardDTO
            {
                TotalCompany = DataContext.Companies.Where(c => !c.DeleteFlag).Count(),
                TotalJob = DataContext.Posts.Where(p => !p.DeleteFlag).Count(),
                TotalStudent = DataContext.Users.Where(u => !u.DeleteFlag).Count(),
                TotalReview = 0
            };

        }
    }
}
