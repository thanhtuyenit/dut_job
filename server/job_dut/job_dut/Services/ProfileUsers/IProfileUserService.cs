using job_dut.DTO;
using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.ProfileUsers
{
    public interface IProfileUserService
    {
        //get profile of user by UserID
        //when admin request view profile of user.
        ProfileUser GetProfileByUserID(long userID);

        
        //get profile of user by UserID
        //convert to ProfileUser to ProfileUserDTO
        ProfileUserDTO GetProfileByUserIDDTO(long userID);

        //get profile of user by username
        //convert to ProfileUser to ProfileUserDTO
        ProfileUserDTO GetProfileByUsernameDTO(string username);

        //use token to update profile
        void UpdateProfileByToken(ProfileUser profileUser, string username);

        //get profile all user base list user
        //return base UserDTO
        UserDTO GetProfileUserDTO(User user);

        void AddSkillOfUser(KeySkill keySkill, string username);

        void DeleteSkillOfUser(long KeySkillID, string username);

        void UploadCV(string fileName, string username);
    }
}
