using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using job_dut.DTO;
using job_dut.Exceptions;
using job_dut.Models;
using job_dut.PagedList;
using job_dut.Responses;
using job_dut.Services.Companies;
using job_dut.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


// APIs
//1. get company list(already paging) -- // GET api/companies
//2. get compay by companyID -- //GET api/companies/{id}
//3. create new a company (function for admin)-- //POST api/companies/create
//4. update a company (function for admin)-- //PUT api/companies/{id} 
//5. block or unblock account of the company (function for admin) -- //PUT api/companies/review/{id}
//6. get a company of a current user (base token) -- //GET api/companies/user
//7. update a company of a current user (base token) It's mean if you are an owner of this the company => you can update (doesn't admin)
// -- PUT api/companies/user/{id}
//8. add key skills for your company -- //POST: api/companies/user/skills
//9. remove key skill for your company -- //DELETE: api/companies/user/skills/{id}
//10. get company list by FacultyID -- //api/companies/faculty/{id} --{id} of the faculty

namespace job_dut.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        public ICompanyService CompanyService { get; }

        public IUserService UserService { get; }

        public IHttpContextAccessor HttpContextAccessor { get; }


        public CompaniesController(ICompanyService companyService,
                                   IHttpContextAccessor httpContextAccessor,
                                   IUserService userService)
        {
            CompanyService = companyService;
            HttpContextAccessor = httpContextAccessor;
            UserService = userService;
        }


        // GET api/companies
        //anybody can access it.
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll(string PageNumber, string PageSize, string Sort, string Type)
        {
            //page default
            int numberOfPage = 1;
            int sizeOfPage = 100;
            string sortBy = "created";
            string typeBy = "desc";

            //check validate of page
            if (PageNumber != null && PageSize != null && Regex.IsMatch(PageNumber, @"^\d+$") && Regex.IsMatch(PageSize, @"^\d+$"))
            {
                numberOfPage = Convert.ToInt32(PageNumber);
                sizeOfPage = Convert.ToInt32(PageSize);
            }

            if (Sort != null && Type != null)
            {
                sortBy = Sort;
                typeBy = Type;
            }
            var model = CompanyService.PagingCompanyConditionList(numberOfPage, sizeOfPage, sortBy, typeBy);

            Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = new PagingOutput
                {
                    Paging = model.GetHeader(),
                    Items = model.List.Select(company => (object)CompanyService.ConvertCompanyToCompanyDTO(company)).ToList()
                }
            });
        }

        //GET api/companies/{id} --{id} of the company
        //anybody can access it.
        //find by companyID
        [AllowAnonymous]
        [HttpGet, Route("{id}")]
        public IActionResult GetByCompanyID(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = CompanyService.FindByCompanyIDDTO(Convert.ToInt32(id))
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }
        }

        //GET api/companies/faculty/{id} --{id} of the faculty
        //anybody can access it.
        //find by companyID
        [AllowAnonymous]
        [HttpGet, Route("faculty/{id}")]
        public IActionResult GetByFacultyID(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = CompanyService.FindByFacultyIDDTO(Convert.ToInt32(id))
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }
        }

        //POST api/companies/create
        // just for admin
        //create new company
        //for role admin
        [HttpPost, Route("create")]
        //[Authorize(Policy = "admin")]
        public IActionResult Create([FromBody] CompanyAddDTO company)
        {
            if (ModelState.IsValid)
            {
                CompanyService.Register(company);
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }

        //PUT api/companies/{id} -> {id} of the company which you want update
        //just for admin
        //update informatin of company
        //function for role admin or account manage this company
        [HttpPut, Route("{id}")]
        //[Authorize(Policy = "admin")]
        public IActionResult Update([FromBody]Company company, string id)
        {
            if (ModelState.IsValid && Regex.IsMatch(id, @"^\d+$"))
            {
                CompanyService.Update(company, Convert.ToUInt32(id));
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }


        //PUT api/companies/review/{id}
        //block or unblock account of the company
        [HttpPut, Route("review/{id}")]
       // [Authorize(Policy = "admin")]
        public IActionResult CompanyReview(string id)
        {
            if (ModelState.IsValid && Regex.IsMatch(id, @"^\d+$"))
            {
                CompanyService.CompanyReview(Convert.ToUInt32(id));
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }


        //GET api/companies/user
        //just for the user have a role which is a company
        //get company base on the username of current user. It's mean get a company which this user manage.
        [HttpGet, Route("user")]
        [Authorize]
        public IActionResult GetCompanyofUserDTO()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = CompanyService.GetCompanyofUserDTO(HttpContextAccessor.HttpContext.User.Identity.Name)
            });
        }

        //PUT api/companies/user/{id}
        //just role company
        //update informatin of company
        //function for account manage this company
        [HttpPut, Route("user/{id}")]
        [Authorize]
        public IActionResult UpdateCompany([FromBody]Company company, string id)
        {
            if (ModelState.IsValid && Regex.IsMatch(id, @"^\d+$"))
            {
                User userCurrent = UserService.FindByUsername(HttpContextAccessor.HttpContext.User.Identity.Name);
                //or userCurrent is owner of the company => OK
                if (CompanyService.FindByCompanyIDAndUserID(Convert.ToInt32(id), userCurrent.ID) || userCurrent.RoleID == 1)
                {
                    CompanyService.Update(company, Convert.ToUInt32(id));
                    return Ok(new APIResponses
                    {
                        Code = 200,
                        Message = "Success!",
                        Data = null
                    });
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

        //POST: api/companies/user/skills
        //just for the user have a role which is a company
        //add skill of company
        //skill added by user manage it.
        [HttpPost, Route("user/skills")]
        [Authorize]
        public IActionResult AddKeySkillCompany([FromBody] KeySkill keySkill)
        {
            if (ModelState.IsValid)
            {
                CompanyService.AddSkillOfCompany(keySkill, HttpContextAccessor.HttpContext.User.Identity.Name);
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }

        //DELETE: api/companies/user/skills
        //just for the user have a role which is a company
        //remove skill of company
        //skill added by user manage it.
        [HttpDelete, Route("user/skills/{id}")]
        [Authorize]
        public IActionResult RemoveKeySkillCompany(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                CompanyService.RemoveSkillOfCompany(Convert.ToInt32(id), HttpContextAccessor.HttpContext.User.Identity.Name);
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }
    }
}