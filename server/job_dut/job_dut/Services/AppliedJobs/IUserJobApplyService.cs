using job_dut.DTO;
using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.AppliedJobs
{
    public interface IUserJobApplyService
    {
        List<UserJobApplyDTO> ListJobAppliedCurrentUser(string username);

        void ApplyJob(UserJobApply userJobApply, string name);
    }
}
