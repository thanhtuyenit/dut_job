using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using job_dut.Commons;
using job_dut.Databases;
using job_dut.Exceptions;
using job_dut.Models;
using Microsoft.EntityFrameworkCore;

namespace job_dut.Services.KeySkills
{
    public class KeySkillService : IKeySkillService
    {
        public DataContext DataContext { get; }

        public KeySkillService(DataContext dataContext)
        {
            DataContext = dataContext;
        }


        public List<KeySkill> GetAll()
        {
            return DataContext.KeySkills.Where(keyskill => !keyskill.DeleteFlag).OrderBy(k => k.Name).ToList();
        }


        public KeySkill GetKeySkillByID(long id)
        {
            KeySkill keySkill = DataContext.KeySkills.SingleOrDefault(x => x.ID == id && !x.DeleteFlag);
            if (keySkill != null)
            {
                return keySkill;
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }


        public void Create(KeySkill keySkill)
        {
            keySkill.Name = CustomString.CustomStr(keySkill.Name);
            keySkill.Description = CustomString.CustomStr(keySkill.Description);

            if (!keySkill.Name.Equals(""))
            {
                keySkill.CreatedAt = DateTime.Now;
                keySkill.UpdatedAt = DateTime.Now;
                keySkill.DeleteFlag = false;
                DataContext.KeySkills.Add(keySkill);
                DataContext.SaveChanges();
            }
            else
            {
                throw new CustomException("400", "Name not null!");
            }
        }


        public void Update(KeySkill keySkill, long id)
        {
            keySkill.Name = CustomString.CustomStr(keySkill.Name);
            keySkill.Description = CustomString.CustomStr(keySkill.Description);

            if (!keySkill.Name.Equals(""))
            {
                KeySkill keySkillOld = GetKeySkillByID(id);
                keySkillOld.Name = keySkill.Name;
                keySkillOld.Description = keySkill.Description;
                keySkillOld.UpdatedAt = DateTime.Now;
                DataContext.KeySkills.Update(keySkillOld);
                DataContext.SaveChanges();
            }
            else
            {
                throw new CustomException("400", "Name not null!");
            }
        }

        public void Delete(long id)
        {
            KeySkill keySkillOld = GetKeySkillByID(id);
            keySkillOld.DeleteFlag = true;
            keySkillOld.UpdatedAt = DateTime.Now;
            DataContext.KeySkills.Update(keySkillOld);
            DataContext.SaveChanges();
        }

        public List<KeySkill> GetSkillCanAddForUser(string username)
        {
            User user = DataContext.Users.Include(uk => uk.UserKeySkills)
                                .ThenInclude(k => k.KeySkill).SingleOrDefault(u => u.Username == username);
            List<KeySkill> allSkill = GetAll();
            //List<KeySkill> skillsCurrent = new List<KeySkill>();
            //if (user != null)
            //{
            //    skillsCurrent = user.UserKeySkills.Select(k => k.KeySkill).ToList();
            //}
            return allSkill.Except(user.UserKeySkills.Select(k => k.KeySkill)).OrderBy(k => k.Name).ToList();
        }

        public List<KeySkill> GetSkillCanAddForCompany(string username)
        {
            User user = DataContext.Users.Include(uk => uk.UserKeySkills)
                                .ThenInclude(k => k.KeySkill).SingleOrDefault(u => u.Username == username);
            List<KeySkill> allSkill = GetAll();
            Company company = DataContext.Companies
                            .Include(ck => ck.CompanyKeySkills).ThenInclude(k => k.KeySkill)
                            .FirstOrDefault(x => x.UserID == user.ID && !x.DeleteFlag);
            return allSkill.Except(company.CompanyKeySkills.Select(k => k.KeySkill)).OrderBy(k => k.Name).ToList();
        }
    }
}
