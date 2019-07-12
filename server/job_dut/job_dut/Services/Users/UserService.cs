using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using job_dut.Commons;
using job_dut.Databases;
using job_dut.DTO;
using job_dut.Exceptions;
using job_dut.Models;
using job_dut.PagedList;
using job_dut.Security;
using job_dut.Services.Facultys;
using job_dut.Services.ProfileUsers;
using job_dut.Services.Roles;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace job_dut.Services.Users
{
    public class UserService : IUserService
    {
        public DataContext DataContext { get; }

        public IMapper Mapper { get; }

        public IRoleService RoleService { get; }

        public IFacultyService FacultyService { get; }

        public IEncrypter Encrypter { get; }

        //public IProfileUserService ProfileUserService { get;}

        public UserService(DataContext dataContext,
                           IMapper mapper,
                           IRoleService roleService,
                           IFacultyService facultyService,
                           IEncrypter encrypter)
        {
            DataContext = dataContext;
            Mapper = mapper;
            RoleService = roleService;
            FacultyService = facultyService;
            Encrypter = encrypter;
        }

        public List<User> GetAll()
        {
            return DataContext.Users.Include(r => r.Role)
                                .Include(uk => uk.UserKeySkills)
                                .ThenInclude(k => k.KeySkill)
                                .Where(user => !user.DeleteFlag)
                                .OrderBy(r => r.RoleID).ThenBy(r => r.Username)
                                .ToList();
        }

        public List<User> GetAllCondition(string Sort, string Type)
        {
            List<User> userList = DataContext.Users.Include(r => r.Role)
                                    .Include(uk => uk.UserKeySkills)
                                    .ThenInclude(k => k.KeySkill)
                                    .Include(up => up.ProfileUsers)
                                    .Where(user => !user.DeleteFlag)
                                    .ToList();
            switch (Sort)
            {
                case "role":
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.Role.Name).ToList();
                    }
                    else
                    {
                        return userList.OrderByDescending(u => u.Role.Name).ToList();
                    }
                case "fullname":
                    List<User> result = new List<User>();
                    foreach (User user in userList)
                    {
                        user.Fullname = user.ProfileUsers.FirstOrDefault(pu => pu.UserID == user.ID).Fullname;
                        result.Add(user);
                    }
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.Fullname).ToList();
                    }
                    else
                    {
                        return result.OrderByDescending(u => u.Fullname).ToList();
                    }
                case "faculty":
                    List<User> resultFaculty = new List<User>();
                    foreach (User user in userList)
                    {
                        user.Faculty = DataContext.Faculties.FirstOrDefault(f => f.ID == user.ProfileUsers.FirstOrDefault(pu => pu.UserID == user.ID).FacultyID);
                        resultFaculty.Add(user);
                    }
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.Faculty.Name).ToList();
                    }
                    else
                    {
                        return resultFaculty.OrderByDescending(u => u.Faculty.Name).ToList();
                    }
                case "status":
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.IsActive).ToList();
                    }
                    else
                    {
                        return userList.OrderByDescending(u => u.IsActive).ToList();
                    }
                default:
                    //username
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.Username).ToList();
                    }
                    else
                    {
                        return userList.OrderByDescending(u => u.Username).ToList();
                    }
                    
            }
        }

        //just get student list
        public List<User> GetAllStudentCondition(string Sort, string Type)
        {
            List<User> userList = DataContext.Users.Include(r => r.Role)
                                    .Include(uk => uk.UserKeySkills)
                                    .ThenInclude(k => k.KeySkill)
                                    .Include(up => up.ProfileUsers)
                                    .Where(user => !user.DeleteFlag && user.RoleID == 2)
                                    .ToList();
            switch (Sort)
            {
                case "role":
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.Role.Name).ToList();
                    }
                    else
                    {
                        return userList.OrderByDescending(u => u.Role.Name).ToList();
                    }
                case "fullname":
                    List<User> result = new List<User>();
                    foreach (User user in userList)
                    {
                        user.Fullname = user.ProfileUsers.FirstOrDefault(pu => pu.UserID == user.ID).Fullname;
                        result.Add(user);
                    }
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.Fullname).ToList();
                    }
                    else
                    {
                        return result.OrderByDescending(u => u.Fullname).ToList();
                    }
                case "faculty":
                    List<User> resultFaculty = new List<User>();
                    foreach (User user in userList)
                    {
                        user.Faculty = DataContext.Faculties.FirstOrDefault(f => f.ID == user.ProfileUsers.FirstOrDefault(pu => pu.UserID == user.ID).FacultyID);
                        resultFaculty.Add(user);
                    }
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.Faculty.Name).ToList();
                    }
                    else
                    {
                        return resultFaculty.OrderByDescending(u => u.Faculty.Name).ToList();
                    }
                case "status":
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.IsActive).ToList();
                    }
                    else
                    {
                        return userList.OrderByDescending(u => u.IsActive).ToList();
                    }
                default:
                    //username
                    if (Type.Equals("asc"))
                    {
                        return userList.OrderBy(u => u.Username).ToList();
                    }
                    else
                    {
                        return userList.OrderByDescending(u => u.Username).ToList();
                    }

            }
        }
        public bool CheckLogin(User user)
        {
            
            User userFind = DataContext.Users
                            .SingleOrDefault(x =>
                                (x.Username.Equals(user.Username)) &&
                               (BCrypt.Net.BCrypt.Verify(user.Password, x.Password)) &&
                                 x.IsActive && !x.DeleteFlag);
            if (userFind != null)
            {
                return true;
            }
            return false;
        }

        public User FindByUsername(string username)
        {
            return DataContext.Users
                    .Include(x => x.Role)
                    .Include(uk => uk.UserKeySkills)
                    .ThenInclude(k => k.KeySkill)
                    .SingleOrDefault(user => user.Username.Equals(username));
        }

        public User FindByUserID(long userID)
        {
            return DataContext.Users
                    .Include(x => x.Role)
                    .Include(uk => uk.UserKeySkills)
                    .ThenInclude(k => k.KeySkill)
                    .SingleOrDefault(user => user.ID == userID);
        }

        public void Register(User user)
        {
            //is valid email
            if (ValidEmail.IsValidEmail(user.Username) && user.Password.Length > 5)
            {
                //check username exist
                User userExits = FindByUsername(user.Username);
                Role role = RoleService.FindByName("user");
                if (userExits == null)
                {
                    //decode password
                    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                    //user.Password = Encrypter.GetHash(user.Password, Encrypter.GetSalt());
                    user.RoleID = role != null ? role.ID : 2;
                    user.CreatedAt = DateTime.Now;
                    user.UpdatedAt = DateTime.Now;
                    user.DeleteFlag = false;
                    user.IsActive = true;
                    user.ProfileUsers.Add(new ProfileUser()
                    {
                        UserID = user.ID,
                        DeleteFlag = false,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        DOB = DateTime.Now,
                        FacultyID = 1
                    });

                    DataContext.Users.Add(user);
                    DataContext.SaveChanges();
                }
                else
                {
                    throw new CustomException("400", "Username already exists!");
                }
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }

        public TokenDTO CreateToken(User user)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("tavia@enclave.vn"));
            User userLogin = FindByUsername(user.Username);
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
                {
                        new Claim(ClaimTypes.Name, userLogin.Username.ToString()),
                        new Claim(ClaimTypes.Role, userLogin.RoleID.ToString())
                    };
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:5000",
                claims: claims,
                expires: DateTime.Now.AddMinutes(5000000),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return new TokenDTO
            {
                Token = tokenString,
                Username = user.Username,
                Role = userLogin.Role
            };
        }

        public PagedList<User> PagingUserList(int PageNumber, int PageSize, string Sort, string Type)
        {

            return new PagedList<User>(
                GetAllCondition(Sort, Type).AsQueryable(), PageNumber, PageSize);
        }

        public PagedList<User> PagingStudentList(int PageNumber, int PageSize, string Sort, string Type)
        {

            return new PagedList<User>(
                GetAllStudentCondition(Sort, Type).AsQueryable(), PageNumber, PageSize);
        }

        public void UpdatePassword(UpdatePassword updatePassword, string username)
        {
            User user = FindByUsername(username);

            //check olsdPassword is correct.
            if (BCrypt.Net.BCrypt.Verify(updatePassword.OldPassword, user.Password))
            {
                //accept to change a new password for user.
                if (updatePassword.NewPassword.Length > 5)
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(updatePassword.NewPassword);
                    user.UpdatedAt = DateTime.Now;
                    DataContext.Users.Update(user);
                    DataContext.SaveChanges();
                }
                else
                {
                    throw new CustomException("400", "Something error!");
                }
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }

        public void ChangeRoleOfUser(long userID)
        {
            User userChange = FindByUserID(userID);
            Role role = RoleService.FindByName("company");
            userChange.RoleID = role != null ? role.ID : 2;
            userChange.UpdatedAt = DateTime.Now;

            DataContext.Users.Update(userChange);
            DataContext.SaveChanges();
        }

        public void UserReview(long userID)
        {
            User userReview = FindByUserID(userID);
            if (userReview.Username.Equals("admin@gmail.com"))
            {
                userReview.IsActive = true;
            }
            else
            {
                userReview.IsActive = !userReview.IsActive;
            }

            userReview.UpdatedAt = DateTime.Now;

            DataContext.Users.Update(userReview);
            DataContext.SaveChanges();
        }
    }
}
