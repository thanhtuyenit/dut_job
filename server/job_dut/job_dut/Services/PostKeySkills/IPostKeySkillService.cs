using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.PostKeySkills
{
    public interface IPostKeySkillService
    {
        PostKeySkill FindByPostIDAndSkillID(long postID, long keySkillID);

        void DeletePostKeySkill(long postID, long keySkillID);

        void AddPostKeySkill(PostKeySkill postKeySkill);
    }
}
