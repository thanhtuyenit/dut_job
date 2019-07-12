using AutoMapper;
using job_dut.Commons;
using job_dut.Databases;
using job_dut.DTO;
using job_dut.Exceptions;
using job_dut.Models;
using job_dut.PagedList;
using job_dut.Services.CompanySkills;
using job_dut.Services.Email;
using job_dut.Services.ProfileUsers;
using job_dut.Services.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace job_dut.Services.Companies
{
    public class CompanyService : ICompanyService
    {
        public DataContext DataContext { get; }

        public IUserService UserService { get; }

        public IProfileUserService ProfileUserService { get; }

        public ICompanySkillService CompanySkillService { get; }

        public IMapper Mapper { get; }

        public CompanyService(DataContext dataContext,
                              IMapper mapper,
                              IUserService userService,
                              IProfileUserService profileUserService,
                              ICompanySkillService companySkillService)
        {
            DataContext = dataContext;
            Mapper = mapper;
            UserService = userService;
            ProfileUserService = profileUserService;
            CompanySkillService = companySkillService;
        }

        public List<Company> GetAll()
        {
            return DataContext.Companies
                                .Where(x => !x.DeleteFlag)
                                .Include(o => o.OvertimeType)
                                .Include(f => f.Faculty)
                                .Include(u => u.User).ThenInclude(r => r.Role)
                                .Include(ck => ck.CompanyKeySkills).ThenInclude(k => k.KeySkill)
                                .OrderBy(r => r.CreatedAt).ThenBy(r => r.Name)
                                .ToList();
        }

        public List<Company> GetAllCompanyCondition(string Sort, string Type)
        {
            List<Company> companies =  DataContext.Companies
                                .Where(x => !x.DeleteFlag)
                                .Include(o => o.OvertimeType)
                                .Include(f => f.Faculty)
                                .Include(u => u.User).ThenInclude(r => r.Role)
                                .Include(ck => ck.CompanyKeySkills).ThenInclude(k => k.KeySkill)
                                // .OrderBy(r => r.CreatedAt).ThenBy(r => r.Name)
                                .ToList();
            switch (Sort)
            {
                case "email":
                    //sort by copmy name
                    if (Type.Equals("asc"))
                    {
                        return companies.OrderBy(c => c.User.Username).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                    else
                    {
                        return companies.OrderByDescending(c => c.User.Username).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                case "phone":
                    //sort by copmy name
                    if (Type.Equals("asc"))
                    {
                        return companies.OrderBy(c => c.Phone).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                    else
                    {
                        return companies.OrderByDescending(c => c.Phone).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                case "time":
                    //sort by copmy name
                    if (Type.Equals("asc"))
                    {
                        return companies.OrderBy(c => c.TimeWorkFrom).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                    else
                    {
                        return companies.OrderByDescending(c => c.TimeWorkFrom).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                case "name":
                    //sort by copmy name
                    if (Type.Equals("asc"))
                    {
                        return companies.OrderBy(c => c.Name).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                    else
                    {
                        return companies.OrderByDescending(c => c.Name).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                case "address":
                    //sort by copmy name
                    if (Type.Equals("asc"))
                    {
                        return companies.OrderBy(c => c.Address).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                    else
                    {
                        return companies.OrderByDescending(c => c.Address).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                case "faculty":
                    //sort by copmy name
                    if (Type.Equals("asc"))
                    {
                        return companies.OrderBy(c => c.Faculty.Name).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                    else
                    {
                        return companies.OrderByDescending(c => c.Faculty.Name).ThenByDescending(d => d.CreatedAt).ToList();
                    }
                default:

                    //default createdAt
                    if (Type.Equals("desc"))
                    {
                        return companies.OrderByDescending(d => d.CreatedAt).ToList();
                    }
                    else
                    {
                        return companies.OrderByDescending(d => d.CreatedAt).ToList();
                    }
            }
            
        }

        public Company FindByCompanyID(long companyID)
        {
            return DataContext.Companies
                                .Include(o => o.OvertimeType)
                                .Include(f => f.Faculty)
                                .Include(u => u.User).ThenInclude(r => r.Role)
                                .Include(ck => ck.CompanyKeySkills).ThenInclude(k => k.KeySkill)
                                .SingleOrDefault(x => x.ID == companyID && !x.DeleteFlag);
        }

        public List<Company> FindByFacultyID(long facultyID)
        {
            return DataContext.Companies
                                .Include(o => o.OvertimeType)
                                .Include(f => f.Faculty)
                                .Include(u => u.User).ThenInclude(r => r.Role)
                                .Include(ck => ck.CompanyKeySkills).ThenInclude(k => k.KeySkill)
                                .Where(x => x.FacultyID == facultyID && !x.DeleteFlag)
                                .OrderBy(r => r.CreatedAt).ThenBy(r => r.Name).Take(8)
                                .ToList();
        }

        public Company FindByUserID(long userID)
        {
            return DataContext.Companies
                                .Include(o => o.OvertimeType)
                                .Include(f => f.Faculty)
                                .Include(u => u.User).ThenInclude(r => r.Role)
                                .Include(ck => ck.CompanyKeySkills).ThenInclude(k => k.KeySkill)
                                .FirstOrDefault(x => x.UserID == userID && !x.DeleteFlag);
        }

        public List<CompanyDTO> GetListCompanyDTO()
        {
            List<Company> companyList = GetAll();
            List<CompanyDTO> result = new List<CompanyDTO>();

            foreach (Company company in companyList)
            {
                result.Add(ConvertCompanyToCompanyDTO(company));
            }
            return result;
        }

        public CompanyDTO ConvertCompanyToCompanyDTO(Company company)
        {
            CompanyDTO companyDTO = Mapper.Map<Company, CompanyDTO>(company);
            companyDTO.Username = company.User.Username;
            companyDTO.Skills = company.CompanyKeySkills.Select(k => k.KeySkill).ToList();
            return companyDTO;
        }

        public PagedList<Company> PagingCompanyList(int PageNumber, int PageSize)
        {
            return new PagedList<Company>(
                GetAll().AsQueryable(), PageNumber, PageSize);
        }

        public PagedList<Company> PagingCompanyConditionList(int PageNumber, int PageSize, string Sort, string Type)
        {
            return new PagedList<Company>(
                GetAllCompanyCondition(Sort, Type).AsQueryable(), PageNumber, PageSize);
        }

        public void Register(CompanyAddDTO company)
        {
            //Create new account of user before add new company
            string passwordRand = RandString.RandomPassword();
            UserService.Register(new User
            {
                Username = company.Username,
                Password = passwordRand
            });

            //affer add success => find it again.
            User userManage = UserService.FindByUsername(company.Username);

            if (userManage != null)
            {
                UserService.ChangeRoleOfUser(userManage.ID);
                Company companyAdd = new Company
                {
                    Name = company.Name,
                    Address = company.Address,
                    Phone = company.Phone,
                    Email = company.Email,
                    Facebook = company.Facebook,
                    Website = company.Website,
                    TimeWorkFrom = company.TimeWorkFrom,
                    TimeWorkTo = company.TimeWorkFrom,
                    EmployeeFrom = company.EmployeeFrom,
                    EmployeeTo = company.EmployeeFrom,
                    OvertimeTypeID = company.OvertimeTypeID != 0 ? company.OvertimeTypeID : 1,
                    Title = company.Title,
                    Description = company.Description,
                    UserID = userManage.ID,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    IsActive = true,
                    DeleteFlag = false,
                    FacultyID = company.FacultyID != 0 ? company.FacultyID : 1
                };

                if (company.Skills != null)
                {
                    foreach (KeySkill keySkill in company.Skills)
                    {
                        companyAdd.CompanyKeySkills.Add(new CompanyKeySkill
                        {
                            CompanyID = companyAdd.ID,
                            KeySkillID = keySkill.ID
                        });
                    }
                }
                
                DataContext.Companies.Add(companyAdd);
                DataContext.SaveChanges();

                //send email to compnany
                CompanyEmailSender send = new CompanyEmailSender();
                send.SendEmailAsync(company.Email,"Welcome Your Company Joined DUT-JOB.",
                    "Dear <lable style='color: red; font-weight: bold'>"+company.Name+"</lable>"+
                    "<br><span>This is an account to manage your comany.</span><br>Email: " + company.Username+"<br>Password: " + passwordRand +
                    "<br>Login at: http://localhost:4200/login");
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }

        }
        // Generate a random password    
        
        public void Update(Company company, long id)
        {
            Company companyOld = FindByCompanyID(id);
            companyOld.Name = company.Name != null ? CustomString.CustomStr(company.Name) : companyOld.Name;
            companyOld.Address = CustomString.CustomStr(company.Address);
            companyOld.Phone = company.Phone != null ? CustomString.CustomStr(company.Phone) : companyOld.Phone;
            companyOld.Email = company.Email != null ? CustomString.CustomStr(company.Email) : companyOld.Email;
            companyOld.Website = company.Website != null ? CustomString.CustomStr(company.Website) : companyOld.Website;
            companyOld.Facebook = CustomString.CustomStr(company.Facebook);
            companyOld.TimeWorkFrom = CustomString.CustomStr(company.TimeWorkFrom);
            companyOld.TimeWorkTo = CustomString.CustomStr(company.TimeWorkFrom);
            companyOld.OvertimeTypeID = company.OvertimeTypeID != 0 ? company.OvertimeTypeID : companyOld.OvertimeTypeID;
            companyOld.EmployeeFrom = company.EmployeeFrom;
            companyOld.EmployeeTo = company.EmployeeFrom;
            companyOld.Title = company.Title != null ? CustomString.CustomStr(company.Title) : companyOld.Title;
            companyOld.Description = company.Description != null ? CustomString.CustomStr(company.Description) : companyOld.Description;
            companyOld.FacultyID = company.FacultyID != 0 ? company.FacultyID : companyOld.FacultyID != 0 ? companyOld.FacultyID : 1;
            DataContext.Companies.Update(companyOld);
            DataContext.SaveChanges();
        }

        public CompanyDTO FindByCompanyIDDTO(long companyID)
        {
            return ConvertCompanyToCompanyDTO(FindByCompanyID(companyID));
        }

        public void CompanyReview(long companyID)
        {
            Company companyReview = FindByCompanyID(companyID);
            companyReview.IsActive = !companyReview.IsActive;
            companyReview.UpdatedAt = DateTime.Now;

            //block/unblock account user who manage this company
            // UserService.UserReview(companyReview.UserID);

            DataContext.Companies.Update(companyReview);
            DataContext.SaveChanges();
        }

        public CompanyDTO GetCompanyofUserDTO(string username)
        {
            //Find user by username
            User currentUser = UserService.FindByUsername(username);

            //find a company which currentUser manage
            Company company = FindByUserID(currentUser.ID);

            return ConvertCompanyToCompanyDTO(company);
        }

        public void AddSkillOfCompany(KeySkill keySkill, string username)
        {
            //Find user by username
            User currentUser = UserService.FindByUsername(username);

            //find a company which currentUser manage
            //just one
            Company company = FindByUserID(currentUser.ID);
            if (CompanySkillService.FindCompanyKeySkill(keySkill.ID, company.ID) == null)
            {
                CompanySkillService.AddCompanyKeySkill(new CompanyKeySkill
                {
                    KeySkillID = keySkill.ID,
                    CompanyID = company.ID,
                });
            }

        }

        public void RemoveSkillOfCompany(long keySkillID, string username)
        {
            //Find user by username
            User currentUser = UserService.FindByUsername(username);

            //find a company which currentUser manage
            //just one
            Company company = FindByUserID(currentUser.ID);

            CompanySkillService.DeleteCompanyKeySkill(keySkillID, company.ID);
        }

        public bool FindByCompanyIDAndUserID(long companyID, long userID)
        {
            return DataContext.Companies.FirstOrDefault(c => c.UserID == userID && c.ID == companyID) != null ? true : false;
        }

        public List<CompanyDTO> FindByFacultyIDDTO(long facultyID)
        {
            List<Company> companyList = FindByFacultyID(facultyID);

            List<CompanyDTO> result = new List<CompanyDTO>();

            foreach (Company company in companyList)
            {
                result.Add(ConvertCompanyToCompanyDTO(company));
            }
            return result;
        }
    }
}
