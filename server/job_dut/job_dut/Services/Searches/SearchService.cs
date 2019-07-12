using AutoMapper;
using job_dut.Commons;
using job_dut.Databases;
using job_dut.DTO;
using job_dut.Models;
using job_dut.PagedList;
using job_dut.Services.Companies;
using job_dut.Services.Posts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.Searches
{
    public class SearchService : ISearchService
    {
        public DataContext DataContext { get; }

        public IMapper Mapper { get; }


        public SearchService(DataContext dataContext,
                             IMapper mapper)
        {
            DataContext = dataContext;
            Mapper = mapper;

        }
        public ResponseSearchDTO SearchJobOrCompany(string keyword)
        {
            //first => find by company name.

            //find Company
            List<Company> companies = DataContext.Companies
                                .Include(o => o.OvertimeType)
                                .Include(f => f.Faculty)
                                .Include(u => u.User).ThenInclude(r => r.Role)
                                .Include(ck => ck.CompanyKeySkills).ThenInclude(k => k.KeySkill)
                                .Where(x => x.Name.Contains(keyword) && !x.DeleteFlag).ToList();
            List<CompanyDTO> companyResult = new List<CompanyDTO>();

            if (companies.Count > 0)
            {
                foreach (Company company in companies)
                {
                    CompanyDTO companyDTO = Mapper.Map<Company, CompanyDTO>(company);
                    companyDTO.Username = company.User.Username;
                    companyDTO.Skills = company.CompanyKeySkills.Select(k => k.KeySkill).ToList();
                    companyResult.Add(companyDTO);
                }
            }


            //all job
            List<Post> postList = DataContext.Posts
                          .Include(c => c.Company)
                          .Include(t => t.JobType)
                          .Include(t => t.Faculty)
                          .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                          //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                          .Where(p => !p.DeleteFlag && p.DateExpire >= DateTime.Now && p.IsDisplay).ToList();

            List<Post> postBySkillSearch = new List<Post>();
            List<Post> postByTitleSearch = new List<Post>();
            List<Post> allJobSearch = new List<Post>();

            //list to save Job by Skill
            List<PostDTO> allJobSearchResult = new List<PostDTO>();

            List<PostKeySkill> postKeySkills = DataContext.PostKeySkills.Where(x => x.KeySkill.Name.Contains(keyword)).ToList();

            postBySkillSearch = postList.Join(postKeySkills, p => p.ID, pk => pk.PostID, (p, pk) => p).ToList();

            //find by title
            postByTitleSearch = DataContext.Posts
                          .Include(c => c.Company)
                          .Include(t => t.JobType)
                          .Include(t => t.Faculty)
                          .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                          //.Include(pk => pk.PostFaculties).ThenInclude(k => k.Faculty)
                          .Where(p => !p.DeleteFlag && p.DateExpire >= DateTime.Now && p.IsDisplay && p.Title.Contains(keyword)).ToList();

            //add postBySkillSearch and postByTitleSearch => allJob (without dupication job)

            allJobSearch = postBySkillSearch.Union(postByTitleSearch).ToList();

            //convert from post to postDTO 
            foreach (Post post in allJobSearch)
            {
                PostDTO postDTO = Mapper.Map<Post, PostDTO>(post);
                postDTO.PostCompany = new PostCompany
                {
                    ID = post.CompanyID,
                    Name = post.Company.Name,
                    Address = post.Company.Address,
                    Email = post.Company.Email
                };
                postDTO.Skills = post.PostKeySkills.Select(k => k.KeySkill).ToList();
                //postDTO.Faculties = post.PostFaculties.Select(k => k.Faculty).ToList();
                allJobSearchResult.Add(postDTO);
            }

            return new ResponseSearchDTO
            {
                CompanySearch = new ResponseCompanySearchDTO
                {
                    Total = companyResult.Count,
                    Company = companyResult
                },
                PostSearch = new ResponseJobSearchDTO
                {
                    Total = allJobSearchResult.Count,
                    Post = allJobSearchResult
                },
            };
        }

        public List<CompanyNameDTO> AllCompanyName()
        {
            List<Company> companies = DataContext.Companies.Where(c => !c.DeleteFlag).ToList();
            List<CompanyNameDTO> companyNames = new List<CompanyNameDTO>();
            foreach (Company company in companies)
            {
                CompanyNameDTO companyNameDTO = new CompanyNameDTO
                {
                    ID = company.ID,
                    Name = company.Name
                };
                companyNames.Add(companyNameDTO);
            }
            return companyNames;
        }

        public ResponseJobSearchDTO SearchJob(string keyword)
        {
            keyword = CustomString.CustomStr(keyword);
            string[] key = keyword.Split(' ');

            //all job
            List<Post> allPostList = DataContext.Posts
                          .Include(c => c.Company)
                          .Include(t => t.JobType)
                          .Include(t => t.Faculty)
                          .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                          .Where(p => !p.DeleteFlag && p.DateExpire >= DateTime.Now && p.IsDisplay).ToList();

            List<Post> postBySkillSearch = new List<Post>();
            List<Post> postByTitleSearch = new List<Post>();
            List<Post> postByFacultySearch = new List<Post>();
            List<Post> postByJobTypeSearch = new List<Post>();
            List<Post> allJobSearch = new List<Post>();

            //list to save result search
            List<PostDTO> resultSearch = new List<PostDTO>();

            List<PostKeySkill> postKeySkills = DataContext.PostKeySkills.Where(x => x.KeySkill.Name.Contains(keyword, StringComparison.CurrentCultureIgnoreCase)).ToList();

            postBySkillSearch = allPostList.Join(postKeySkills, p => p.ID, pk => pk.PostID, (p, pk) => p).ToList();

            //find by title
            postByTitleSearch = allPostList.Where(p => p.Title.Contains(keyword, StringComparison.CurrentCultureIgnoreCase)).ToList();

            //search job by faculty
            postByFacultySearch = allPostList.Where(p => p.Faculty.Name.Contains(keyword, StringComparison.CurrentCultureIgnoreCase)).ToList();

            //search job by jobType
            postByJobTypeSearch = allPostList.Where(p => p.JobType.Name.Contains(keyword, StringComparison.CurrentCultureIgnoreCase)).ToList();

            //add postBySkillSearch and postByTitleSearch => allJob (without dupication job)

            allJobSearch = postBySkillSearch.Union(postByTitleSearch).ToList();

            allJobSearch = allJobSearch.Union(postByFacultySearch).ToList();

            allJobSearch = allJobSearch.Union(postByJobTypeSearch).ToList();

            //convert from post to postDTO 
            foreach (Post post in allJobSearch)
            {
                PostDTO postDTO = Mapper.Map<Post, PostDTO>(post);
                postDTO.PostCompany = new PostCompany
                {
                    ID = post.CompanyID,
                    Name = post.Company.Name,
                    Address = post.Company.Address,
                    Email = post.Company.Email
                };
                postDTO.Skills = post.PostKeySkills.Select(k => k.KeySkill).ToList();
                //postDTO.Faculties = post.PostFaculties.Select(k => k.Faculty).ToList();
                resultSearch.Add(postDTO);
            }

            return new ResponseJobSearchDTO
            {
                Total = resultSearch.Count,
                Post = resultSearch
            };
        }

        public List<Post> Search(string keyword)
        {
            keyword = CustomString.CustomStr(keyword);
            string[] key = keyword.Split(' ');

            //all job
            List<Post> allPostList = DataContext.Posts
                          .Include(c => c.Company)
                          .Include(t => t.JobType)
                          .Include(t => t.Faculty)
                          .Include(pk => pk.PostKeySkills).ThenInclude(k => k.KeySkill)
                          .Where(p => !p.DeleteFlag && p.DateExpire >= DateTime.Now && p.IsDisplay).ToList();

            List<Post> postBySkillSearch = new List<Post>();
            List<Post> postByTitleSearch = new List<Post>();
            List<Post> postByFacultySearch = new List<Post>();
            List<Post> postByJobTypeSearch = new List<Post>();
            List<Post> allJobSearch = new List<Post>();

            //list to save result search
            List<PostDTO> resultSearch = new List<PostDTO>();

            List<PostKeySkill> postKeySkills = DataContext.PostKeySkills.Where(x => x.KeySkill.Name.Contains(keyword, StringComparison.CurrentCultureIgnoreCase)).ToList();

            postBySkillSearch = allPostList.Join(postKeySkills, p => p.ID, pk => pk.PostID, (p, pk) => p).ToList();

            //find by title
            postByTitleSearch = allPostList.Where(p => p.Title.Contains(keyword, StringComparison.CurrentCultureIgnoreCase)).ToList();

            //search job by faculty
            postByFacultySearch = allPostList.Where(p => p.Faculty.Name.Contains(keyword, StringComparison.CurrentCultureIgnoreCase)).ToList();

            //search job by jobType
            postByJobTypeSearch = allPostList.Where(p => p.JobType.Name.Contains(keyword, StringComparison.CurrentCultureIgnoreCase)).ToList();

            //add postBySkillSearch and postByTitleSearch => allJob (without dupication job)

            allJobSearch = postBySkillSearch.Union(postByTitleSearch).ToList();

            allJobSearch = allJobSearch.Union(postByFacultySearch).ToList();

            allJobSearch = allJobSearch.Union(postByJobTypeSearch).ToList();

            return allJobSearch;
        }

        public PostDTO Convert(Post post)
        {
            PostDTO postDTO = Mapper.Map<Post, PostDTO>(post);
            postDTO.PostCompany = new PostCompany
            {
                ID = post.CompanyID,
                Name = post.Company.Name,
                Address = post.Company.Address,
                Email = post.Company.Email
            };
            postDTO.Skills = post.PostKeySkills.Select(k => k.KeySkill).ToList();
            return postDTO;
        }

        public PagedList<Post> PagingJobSearch(string keyword, int PageNumber, int PageSize)
        {
            return new PagedList<Post>(
               Search(keyword).AsQueryable(), PageNumber, PageSize);
        }
        public List<KeySuggestSearch> ListKeyWordSuggestToSearch()
        {
            List<KeySuggestSearch> result = new List<KeySuggestSearch>();

            foreach(KeySkill key in DataContext.KeySkills.Where(k => !k.DeleteFlag))
            {
                KeySuggestSearch KeySuggestSearch = new KeySuggestSearch
                {
                    Name = key.Name
                };
                result.Add(KeySuggestSearch);
            }

            foreach(Faculty faculty in DataContext.Faculties.Where(f => !f.DeleteFlag))
            {
                KeySuggestSearch KeySuggestSearch = new KeySuggestSearch
                {
                    Name = faculty.Name
                };
                result.Add(KeySuggestSearch);
            }

            foreach (JobType jobType in DataContext.JobTypes.Where(f => !f.DeleteFlag))
            {
                KeySuggestSearch KeySuggestSearch = new KeySuggestSearch
                {
                    Name = jobType.Name
                };
                result.Add(KeySuggestSearch);
            }

            return result;
        }
    }
}
