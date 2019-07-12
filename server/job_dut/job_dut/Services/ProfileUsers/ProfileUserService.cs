using AutoMapper;
using job_dut.Commons;
using job_dut.Databases;
using job_dut.DTO;
using job_dut.Exceptions;
using job_dut.Models;
using job_dut.Services.Facultys;
using job_dut.Services.UserKeySkills;
using job_dut.Services.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.ProfileUsers
{
    public class ProfileUserService : IProfileUserService
    {
        public DataContext DataContext { get; }

        public IMapper Mapper { get; }

        public IUserService UserService { get; }

        public IFacultyService FacultyService { get; }

        public IUserKeySkillService UserKeySkillService { get; }

        public ProfileUserService(DataContext dataContext,
                                  IUserService userService,
                                  IMapper mapper,
                                  IFacultyService facultyService,
                                  IUserKeySkillService userKeySkillService)
        {
            DataContext = dataContext;
            UserService = userService;
            Mapper = mapper;
            FacultyService = facultyService;
            UserKeySkillService = userKeySkillService;
        }

        public ProfileUser GetProfileByUserID(long userID)
        {
            ProfileUser profileUser = DataContext.ProfileUsers
                                        .Include(u => u.User)
                                        .Include(f => f.Faculty)
                                        .FirstOrDefault(x => x.UserID == userID && !x.DeleteFlag);
            if (profileUser != null)
            {
                return profileUser;
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }

        }

        public ProfileUserDTO GetProfileByUserIDDTO(long userID)
        {
            User user = UserService.FindByUserID(userID);

            ProfileUser profileUser = GetProfileByUserID(userID);

            ProfileUserDTO profileUserDTO;
            profileUserDTO = Mapper.Map<ProfileUser, ProfileUserDTO>(profileUser);

            profileUserDTO.UserID = userID;
            profileUserDTO.Username = user.Username;
            profileUserDTO.IsActive = user.IsActive;
            profileUserDTO.IsReceiveEmail = user.IsReceiveEmail;
            profileUserDTO.Role = user.Role;
            profileUserDTO.Skills = user.UserKeySkills.Select(k => k.KeySkill).ToList();

            return profileUserDTO;
        }

        public ProfileUserDTO GetProfileByUsernameDTO(string username)
        {
            User user = UserService.FindByUsername(username);
            ProfileUser profileUser = GetProfileByUserID(user.ID);

            ProfileUserDTO profileUserDTO;
            profileUserDTO = Mapper.Map<ProfileUser, ProfileUserDTO>(profileUser);

            profileUserDTO.UserID = user.ID;
            profileUserDTO.Username = user.Username;
            profileUserDTO.IsActive = user.IsActive;
            profileUserDTO.IsReceiveEmail = user.IsReceiveEmail;
            profileUserDTO.Role = user.Role;
            profileUserDTO.Skills = user.UserKeySkills.Select(k => k.KeySkill).ToList();
            return profileUserDTO;
        }


        public void UpdateProfileByToken(ProfileUser profileUser, string username)
        {
            //just update something as: Fullname, Birthday, Aboutme, Phone, CVLink, Website
            //find user by email/username
            User user = UserService.FindByUsername(username);

            ProfileUser profileUserOld = GetProfileByUserID(user.ID);

            profileUserOld.Fullname = CustomString.CustomStr(profileUser.Fullname);
            profileUserOld.AboutMe = CustomString.CustomStr(profileUser.AboutMe);
            profileUserOld.Address = CustomString.CustomStr(profileUser.Address);
            profileUserOld.Phone = CustomString.CustomStr(profileUser.Phone);
            profileUserOld.CVLink = CustomString.CustomStr(profileUser.CVLink);
            profileUserOld.Website = CustomString.CustomStr(profileUser.Website);

            profileUserOld.DOB = profileUser.DOB.GetHashCode() != 0 ? profileUser.DOB : DateTime.Now;
            profileUserOld.FacultyID = profileUser.FacultyID != 0 ? profileUser.FacultyID : 1 ;


            DataContext.ProfileUsers.Update(profileUserOld);
            DataContext.SaveChanges();
        }


        //function for user list.
        //follow format UserDTO 
        public UserDTO GetProfileUserDTO(User user)
        {
            UserDTO userDTO = new UserDTO();
            userDTO = Mapper.Map<User, UserDTO>(user);
            ProfileUser profileUser = GetProfileByUserID(user.ID);
            userDTO.ID = user.ID;
            userDTO.Faculty = profileUser.Faculty;
            userDTO.FullName = profileUser.Fullname;
            return userDTO;
        }

        public void AddSkillOfUser(KeySkill keySkill, string username)
        {
            User user = UserService.FindByUsername(username);

            //find UserKeySkill -- check exist of UserKeySkill
            UserKeySkill userKeySkill = UserKeySkillService.FindUserKeySkill(keySkill.ID, user.ID);

            //if not exist -> add it
            if(userKeySkill == null)
            {
                UserKeySkillService.AddUserKeySkill(userKeySkill = new UserKeySkill
                {
                    UserID = user.ID,
                    KeySkillID = keySkill.ID,
                    DeleteFlag = false,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                });
            }
            //add new
        }

        public void DeleteSkillOfUser(long keySkillID, String username)
        {
            UserKeySkillService.DeleteUserKeySkill(keySkillID, UserService.FindByUsername(username).ID);
        }

        public void UploadCV(string fileName, string username)
        {
            User user = UserService.FindByUsername(username);
            ProfileUser profileUserOld = GetProfileByUserID(user.ID);
            profileUserOld.CVLink = fileName;
            DataContext.ProfileUsers.Update(profileUserOld);
            DataContext.SaveChanges();
        }
    }
}
