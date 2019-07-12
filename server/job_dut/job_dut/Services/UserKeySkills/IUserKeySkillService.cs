using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.UserKeySkills
{
    public interface IUserKeySkillService
    {
        void AddUserKeySkill(UserKeySkill userKeySkill);

        UserKeySkill FindUserKeySkill(long skillID, long userID);

        void DeleteUserKeySkill(long keySkillID, long userID);
    }
}
