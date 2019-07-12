using job_dut.Databases;
using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.UserKeySkills
{
    public class UserKeySkillService : IUserKeySkillService
    {
        public DataContext DataContext { get; }

        public UserKeySkillService(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        public UserKeySkill FindUserKeySkill(long skillID, long userID)
        {
            return DataContext.UserKeySkill.FirstOrDefault(x => x.KeySkillID == skillID && x.UserID == userID);
        }

        public void DeleteUserKeySkill(long keySkillID, long userID)
        {
            UserKeySkill userKeySkillDel = DataContext.UserKeySkill
                                            .FirstOrDefault(x => x.KeySkillID == keySkillID && x.UserID == userID);

            DataContext.UserKeySkill.Remove(userKeySkillDel);
            DataContext.SaveChanges();
        }

        public void AddUserKeySkill(UserKeySkill userKeySkill)
        {
            DataContext.UserKeySkill.Add(userKeySkill);
            DataContext.SaveChanges();
        }
    }
}
