using job_dut.Databases;
using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.CompanySkills
{
    public class CompanySkillService : ICompanySkillService
    {
        public DataContext DataContext { get; set; }

        public CompanySkillService(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        public CompanyKeySkill FindCompanyKeySkill(long skillID, long companyID)
        {
            return DataContext.CompanyKeySkills.FirstOrDefault(x => x.KeySkillID == skillID && x.CompanyID == companyID);
        }

        public void DeleteCompanyKeySkill(long keySkillID, long companyID)
        {
            CompanyKeySkill companyKeySkillDel = DataContext.CompanyKeySkills
                                                    .FirstOrDefault(x => x.KeySkillID == keySkillID && 
                                                                         x.CompanyID == companyID);
            DataContext.CompanyKeySkills.Remove(companyKeySkillDel);
            DataContext.SaveChanges();
        }

        public void AddCompanyKeySkill(CompanyKeySkill companyKeySkill)
        {
            DataContext.CompanyKeySkills.Add(companyKeySkill);
            DataContext.SaveChanges();
        }
    }
}
