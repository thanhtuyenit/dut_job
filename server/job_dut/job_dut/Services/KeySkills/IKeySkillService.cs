using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Models;

namespace job_dut.Services.KeySkills
{
    public interface IKeySkillService
    {
        List<KeySkill> GetAll();

        void Create(KeySkill keySkill);

        KeySkill GetKeySkillByID(long id);

        void Update(KeySkill keySkill, long id);

        void Delete(long id);

        List<KeySkill> GetSkillCanAddForUser(string username);

        List<KeySkill> GetSkillCanAddForCompany(string username);
    }
}
