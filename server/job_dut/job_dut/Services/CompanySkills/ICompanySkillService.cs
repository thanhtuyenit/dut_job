using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.CompanySkills
{
    public interface ICompanySkillService
    {
        void AddCompanyKeySkill(CompanyKeySkill companyKeySkill);

        CompanyKeySkill FindCompanyKeySkill(long skillID, long companyID);

        void DeleteCompanyKeySkill(long skillID, long companyID);
    }
}
