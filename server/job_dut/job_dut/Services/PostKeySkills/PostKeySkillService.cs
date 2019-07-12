using job_dut.Databases;
using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.PostKeySkills
{
    public class PostKeySkillService : IPostKeySkillService
    {
        public DataContext DataContext { get; set; }

        public PostKeySkillService(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        public void DeletePostKeySkill(long postID, long keySkillID)
        {
            DataContext.PostKeySkills.Remove(FindByPostIDAndSkillID(postID, keySkillID));
            DataContext.SaveChanges();
        }

        public PostKeySkill FindByPostIDAndSkillID(long postID, long keySkillID)
        {
            return DataContext.PostKeySkills.FirstOrDefault(pks => pks.KeySkillID == keySkillID && pks.PostID == postID);
        }

        public void AddPostKeySkill(PostKeySkill postKeySkill)
        {
            //if not exist => add
            if(FindByPostIDAndSkillID(postKeySkill.PostID, postKeySkill.KeySkillID) == null){
                DataContext.PostKeySkills.Add(postKeySkill);
                DataContext.SaveChanges();
            }
            
        }
    }
}
