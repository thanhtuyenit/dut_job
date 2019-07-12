using AutoMapper;
using job_dut.Databases;
using job_dut.DTO;
using job_dut.Exceptions;
using job_dut.Models;
using job_dut.PagedList;
using job_dut.Services.Companies;
using job_dut.Services.PostKeySkills;
using job_dut.Services.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.Posts
{
    public class PostService : IPostService
    {
        public DataContext DataContext { get; }

        public IMapper Mapper { get; }

        public IUserService UserService { get; }

        public ICompanyService CompanyService { get; }

        public IPostKeySkillService PostKeySkillService { get; }

        //public IPostFacultyService PostFacultyService { get; }

        public PostService(DataContext dataContext,
                           IMapper mapper,
                           ICompanyService companyService,
                           IPostKeySkillService postKeySkillService)
        {
            DataContext = dataContext;
            Mapper = mapper;
            CompanyService = companyService;
            PostKeySkillService = postKeySkillService;
        }

        public PostService()
        {
        }

        public PostDTO ConvertPostToPostDTO(Post post)
        {
            PostDTO postDTO = Mapper.Map<Post, PostDTO>(post);

            postDTO.PostCompany = new PostCompany
            {
                ID = post.CompanyID,
                //Username = post.Company.User.Username,
                Name = post.Company.Name,
                Address = post.Company.Address,
                Email = post.Company.Email,
                Avatar = post.Company.Avatar,
                Title = post.Company.Title,
               // Faculty = post.Faculty
            };
            postDTO.Skills = post.PostKeySkills.Select(k => k.KeySkill).ToList();
            //postDTO.Faculties = post.PostFaculties.Select(k => k.Faculty).ToList();
            return postDTO;
        }

        public List<Post> GetAll(bool check)
        {
            if (check)
            {
                //get all job
                return DataContext.Posts
                            .Include(c => c.Company)
                            .Include(t => t.JobType)
                            .Include(t => t.Faculty)
                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                            //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                            .Where(p => !p.DeleteFlag)
                            .OrderByDescending(r => r.CreatedAt).ThenByDescending(r => r.DateExpire)
                            .ToList();
            }
            else
            {
                //exception Expire/IsDisplay == false
                return DataContext.Posts
                            .Include(c => c.Company)
                            .Include(t => t.JobType)
                            .Include(t => t.Faculty)
                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                            //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                            .Where(p => p.DateExpire >= DateTime.Now && !p.DeleteFlag && p.IsDisplay)
                            .OrderByDescending(r => r.CreatedAt).ThenByDescending(r => r.DateExpire).Take(20)
                            .ToList();
            }

        }

        public List<Post> GetJobByCompanyID(long companyID, bool check)
        {
            if (check)
            {
                //all job
                return DataContext.Posts
                            .Include(c => c.Company)
                            .Include(t => t.JobType)
                            .Include(f => f.Faculty)
                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                            //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                            .Where(p => p.CompanyID == companyID && !p.DeleteFlag)
                            .OrderByDescending(r => r.CreatedAt).ThenByDescending(r => r.DateExpire)
                            .ToList();
            }
            else
            {
                //exception Expire/IsDisplay == false

                return DataContext.Posts
                                            .Include(c => c.Company)
                                            .Include(t => t.JobType)
                                            .Include(f => f.Faculty)
                                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                                            //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                                            .Where(p => p.CompanyID == companyID && !p.DeleteFlag && p.DateExpire >= DateTime.Now && p.IsDisplay)
                                            .OrderByDescending(r => r.CreatedAt).ThenByDescending(r => r.DateExpire)
                                            .ToList();
            }

        }

        public List<Post> GetJobByFacultyID(long facultyID, bool check)
        {
            ////find in the PostFaculty (table) which have FacultyID == facultyID
            //List<Post> postFacultiesList = DataContext.Posts.Where(x => x.FacultyID == facultyID).ToList();

            //////find posts
            ////List<Post> postList = new List<Post>();
            ////if (check)
            ////{
            ////    //all
            ////    postList = GetAll(true);
            ////}
            ////else
            ////{
            ////    //exception expire/isDisplay==false
            ////    postList = GetAll(false);
            ////}

            // return postList.Join(postFacultiesList, p => p.ID, pf => pf.FacultyID, (p, pf) => p).ToList();
            ////return postList;
            return DataContext.Posts.Include(c => c.Company)
                            .Include(t => t.JobType)
                            .Include(f => f.Faculty)
                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                            //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                            .Where(p => p.FacultyID == facultyID && !p.DeleteFlag && p.IsDisplay && p.DateExpire >= DateTime.Now)
                            .OrderByDescending(r => r.CreatedAt).ThenByDescending(r => r.NumberView).Take(10)
                            .ToList();
        }

        public Post FindByPostID(long postID, bool check)
        {
            Post post = new Post();
            if (check)
            {
                //view job which include job expire/isDisplay == false
                post = DataContext.Posts
                            .Include(c => c.Company)
                            .Include(t => t.JobType)
                            .Include(f => f.Faculty)
                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                            //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                            .FirstOrDefault(p => !p.DeleteFlag && p.ID == postID);

            }
            else
            {
                //exception expire/isDisplay == false
                //view for user see.
                post = DataContext.Posts
                           .Include(c => c.Company)
                           .Include(t => t.JobType)
                           .Include(f => f.Faculty)
                           .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                           //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                           .FirstOrDefault(p => !p.DeleteFlag && p.ID == postID && p.DateExpire >= DateTime.Now && p.IsDisplay);
                if (post != null)
                {
                    //increase view of the post.
                    post.NumberView += 1;
                    DataContext.Posts.Update(post);
                    DataContext.SaveChanges();
                }
            }


            return post;
        }

        public Post FindByPostIDAndCompanyID(long postID, long companyID, bool check)
        {
            if (check)
            {
                //view job which include job expire/isDisplay == false
                return DataContext.Posts
                            .Include(c => c.Company)
                            .Include(t => t.JobType)
                            .Include(f => f.Faculty)
                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                            //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                            .FirstOrDefault(p => !p.DeleteFlag && p.ID == postID && p.CompanyID == companyID);
            }
            else
            {
                //exception expire/isDisplay == false
                //view for user see.
                return DataContext.Posts
                           .Include(c => c.Company)
                           .Include(t => t.JobType)
                           .Include(f => f.Faculty)
                           .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                           //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                           .FirstOrDefault(p => !p.DeleteFlag && p.ID == postID && p.DateExpire >= DateTime.Now && p.IsDisplay);
            }
        }

        public PagedList<Post> PagingJobList(int PageNumber, int PageSize, string sort, string type)
        {
            return new PagedList<Post>(
               GetAllSort(true, sort, type).AsQueryable(), PageNumber, PageSize);
        }

        public List<Post> GetAllSort(bool check, string sort, string type)
        {
            if (check)
            {
                //get all job
                List<Post> post = DataContext.Posts
                            .Include(c => c.Company)
                            .Include(t => t.JobType)
                            .Include(f => f.Faculty)
                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                            //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                            .Where(p => !p.DeleteFlag)
                            .OrderByDescending(r => r.CreatedAt).ThenByDescending(r => r.DateExpire)
                            .ToList();
                // List<Post> result = new List<Post>();
                switch (sort)
                {
                    case "views":
                        if (type.Equals("asc"))
                        {
                            return post.OrderBy(p => p.NumberView).ToList();
                        }
                        else
                        {
                            return post.OrderByDescending(p => p.NumberView).ToList();
                        }
                    case "expire":
                        if (type.Equals("asc"))
                        {
                            return post.OrderBy(p => p.DateExpire).ToList();
                        }
                        else
                        {
                            return post.OrderByDescending(p => p.DateExpire).ToList();
                        }
                    case "title":
                        if (type.Equals("asc"))
                        {
                            return post.OrderBy(p => p.Title).ToList();
                        }
                        else
                        {
                            return post.OrderByDescending(p => p.Title).ToList();
                        }
                    case "type":
                        if (type.Equals("asc"))
                        {
                            return post.OrderBy(p => p.JobType.Name).ToList();
                        }
                        else
                        {
                            return post.OrderByDescending(p => p.JobType.Name).ToList();
                        }
                    case "status":
                        if (type.Equals("asc"))
                        {
                            return post.OrderBy(p => p.IsDisplay).ToList();
                        }
                        else
                        {
                            return post.OrderByDescending(p => p.IsDisplay).ToList();
                        }
                    case "company":
                        if (type.Equals("asc"))
                        {
                            return post.OrderBy(p => p.Company.Name).ToList();
                        }
                        else
                        {
                            return post.OrderByDescending(p => p.Company.Name).ToList();
                        }
                    default:
                        return post.OrderByDescending(p => p.CreatedAt).ToList();
                        //if (type.Equals("asc"))
                        //{
                        //    return post.OrderBy(p => p.Company.Name).ToList();
                        //}
                        //else
                        //{
                        //    return post.OrderByDescending(p => p.Company.Name).ToList();
                        //}
                }
            }
            else
            {
                //exception Expire/IsDisplay == false
                return DataContext.Posts
                            .Include(c => c.Company)
                            .Include(t => t.JobType)
                            .Include(f => f.Faculty)
                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                            //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                            .Where(p => p.DateExpire >= DateTime.Now && !p.DeleteFlag && p.IsDisplay)
                            .OrderByDescending(r => r.CreatedAt).ThenByDescending(r => r.DateExpire)
                            .ToList();
            }

        }

        public PagedList<Post> PagingJobWithoutJobExpire(int PageNumber, int PageSize)
        {
            return new PagedList<Post>(
               GetAll(false).AsQueryable(), PageNumber, PageSize);
        }

        public PagedList<Post> PagingJobOfCompany(long CompanyId, int PageNumber, int PageSize)
        {
            return new PagedList<Post>(
               GetJobByCompanyID(CompanyId, true).AsQueryable(), PageNumber, PageSize);
        }

        public PagedList<Post> PagingJobOfCompanyWithoutJobExpire(long CompanyId, int PageNumber, int PageSize)
        {
            return new PagedList<Post>(
               GetJobByCompanyID(CompanyId, false).AsQueryable(), PageNumber, PageSize);
        }

        public PagedList<Post> PagingJobOfFaculty(long facultyID, int PageNumber, int PageSize)
        {
            return new PagedList<Post>(
               GetJobByFacultyID(facultyID, true).AsQueryable(), PageNumber, PageSize);
        }

        public PagedList<Post> PagingJobOfFacultyWithoutJobExpire(long facultyID, int PageNumber, int PageSize)
        {
            return new PagedList<Post>(
               GetJobByFacultyID(facultyID, false).AsQueryable(), PageNumber, PageSize);
        }

        public PagedList<Post> GetJobManageByCurrentUser(string username, int PageNumber, int PageSize, string Sort, string Type)
        {
            //find user by username
            User user = DataContext.Users.SingleOrDefault(u => u.Username == username);
            //get first company manage by this use
            Company company = DataContext.Companies.FirstOrDefault(c => c.UserID == user.ID);

            return new PagedList<Post>(
               GetJobByCompanyIDCondition(company.ID, Sort, Type).AsQueryable(), PageNumber, PageSize);
        }
        public List<Post> GetJobByCompanyIDCondition(long companyID, string sort, string type)
        {
            //all job
            List<Post> postList = DataContext.Posts
                                  .Include(c => c.Company)
                                  .Include(t => t.JobType)
                                  .Include(f => f.Faculty)
                                  .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                                  .Where(p => p.CompanyID == companyID && !p.DeleteFlag)
                                  .ToList();
            switch (sort)
            {
                case "views":
                    if (type.Equals("asc"))
                    {
                        return postList.OrderBy(p => p.NumberView).ToList();
                    }
                    else
                    {
                        return postList.OrderByDescending(p => p.NumberView).ToList();
                    }
                case "expire":
                    if (type.Equals("asc"))
                    {
                        return postList.OrderBy(p => p.DateExpire).ToList();
                    }
                    else
                    {
                        return postList.OrderByDescending(p => p.DateExpire).ToList();
                    }
                case "title":
                    if (type.Equals("asc"))
                    {
                        return postList.OrderBy(p => p.Title).ToList();
                    }
                    else
                    {
                        return postList.OrderByDescending(p => p.Title).ToList();
                    }
                case "type":
                    if (type.Equals("asc"))
                    {
                        return postList.OrderBy(p => p.JobType.Name).ToList();
                    }
                    else
                    {
                        return postList.OrderByDescending(p => p.JobType.Name).ToList();
                    }
                case "status":
                    if (type.Equals("asc"))
                    {
                        return postList.OrderBy(p => p.IsDisplay).ToList();
                    }
                    else
                    {
                        return postList.OrderByDescending(p => p.IsDisplay).ToList();
                    }
                default:
                    return postList.OrderByDescending(p => p.CreatedAt).ToList();
                    //if (type.Equals("desc"))
                    //{
                    //    return postList.OrderByDescending(p => p.CreatedAt).ToList();
                    //}
                    //else
                    //{
                    //    return postList.OrderBy(p => p.CreatedAt).ToList();
                    //}
            }
        }

        public void CreateJob(PostAddDTO post, string username)
        {
            //find user by username
            User user = DataContext.Users.SingleOrDefault(u => u.Username == username);

            //get first company manage by this use
            Company company;
            if (user != null)
            {
                company = CompanyService.FindByUserID(user.ID);
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }

            Post postAdd = new Post
            {
                CompanyID = company.ID,
                Title = post.Title,
                Reason = post.Reason,
                Description = post.Description,
                Experience = post.Experience,
                Benefit = post.Benefit,
                DateExpire = DateTime.Now.AddMonths(2),
                Salary = post.Salary,
                NumberView = 0,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                IsDisplay = false,
                DeleteFlag = false,
                JobTypeID = post.JobTypeID != 0 ? post.JobTypeID : 1,
                FacultyID = post.FacultyID != 0 ? post.FacultyID : company.FacultyID,
            };

            if (post.Skills != null)
            {
                foreach (var item in post.Skills)
                {
                    postAdd.PostKeySkills.Add(new PostKeySkill()
                    {
                        KeySkillID = item.ID,
                        PostID = postAdd.ID
                    });
                }
            }

            //if (post.Faculties != null)
            //{
            //    foreach (var item in post.Faculties)
            //    {
            //        postAdd.PostFaculties.Add(new PostFaculty()
            //        {
            //            FacultyID = item.ID,
            //            PostID = postAdd.ID
            //        });
            //    }
            //}
            //else
            //{
            //    postAdd.PostFaculties.Add(new PostFaculty()
            //    {
            //        FacultyID = company.FacultyID,
            //        PostID = postAdd.ID
            //    });
            //}

            DataContext.Posts.Add(postAdd);
            DataContext.SaveChanges();
        }

        public void UpdateJob(PostAddDTO post, long postID, string username)
        {
            //find user by username
            User user = DataContext.Users.SingleOrDefault(u => u.Username == username);

            //get first company manage by this use
            Company company;
            if (user != null)
            {
                company = CompanyService.FindByUserID(user.ID);
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }


            //find post(include expire)
            Post postOld = FindByPostIDAndCompanyID(postID, company.ID, true);

            //confirm this current user is a owner of this post.
            if (postOld != null)
            {
                postOld.Title = post.Title;
                postOld.Reason = post.Reason;
                postOld.Description = post.Description;
                postOld.Experience = post.Experience;
                postOld.Benefit = post.Benefit;
                //postOld.DateExpire = post.DateExpire;
                postOld.Salary = post.Salary;
                postOld.UpdatedAt = DateTime.Now;
                postOld.JobTypeID = post.JobType.ID != 0 ? post.JobType.ID : 1;
                postOld.FacultyID = post.FacultyID != 0 ? post.FacultyID : company.FacultyID;

                DataContext.Posts.Update(postOld);
                DataContext.SaveChanges();

                //delete all faculty of postOld and add new for post (postUpdate)
                if (post.Skills != null)
                {
                    //delete
                    foreach (KeySkill keySkill in postOld.PostKeySkills.Select(k => k.KeySkill).ToList())
                    {
                        PostKeySkillService.DeletePostKeySkill(postOld.ID, keySkill.ID);
                    }

                    //add
                    foreach (KeySkill keySkill in postOld.PostKeySkills.Select(k => k.KeySkill).ToList())
                    {
                        PostKeySkillService.AddPostKeySkill(new PostKeySkill
                        {
                            PostID = postOld.ID,
                            KeySkillID = keySkill.ID
                        });
                    }
                }
            }
            else
            {
                throw new CustomException("400", "You aren't owned this post.");
            }

        }

        public void DeleteJob(long postID, string username)
        {
            //find user by username
            User user = DataContext.Users.SingleOrDefault(u => u.Username == username);

            //get first company manage by this use
            Company company = DataContext.Companies.FirstOrDefault(c => c.UserID == user.ID);

            Post post = DataContext.Posts.SingleOrDefault(p => p.ID == postID && !p.DeleteFlag);

            if (post != null)
            {
                //delete it
                post.DeleteFlag = true;
                DataContext.Posts.Update(post);
                DataContext.SaveChanges();
            }
            else
            {
                throw new CustomException("400", "ID not found!");

            }
        }

        public void ReviewJob(long postID)
        {
            Post post = FindByPostID(postID, true);
            if (post != null)
            {
                post.IsDisplay = !post.IsDisplay;
                DataContext.Posts.Update(post);
                DataContext.SaveChanges();
            }
        }

        public List<PostDTO> Top8JobsPublic()
        {
            List<Post> top8 = DataContext.Posts
                            .Include(c => c.Company)
                            .Include(t => t.JobType)
                            .Include(t => t.Faculty)
                            .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                            .Where(p => !p.DeleteFlag && p.DateExpire >= DateTime.Now && p.IsDisplay)
                            .OrderByDescending(r => r.CreatedAt).ThenByDescending(r => r.DateExpire).Take(8)
                            .ToList();
            List<PostDTO> resultTop8 = new List<PostDTO>();
            foreach (Post post in top8)
            {
                resultTop8.Add(ConvertPostToPostDTO(post));
            }
            return resultTop8;
        }
    }
}
