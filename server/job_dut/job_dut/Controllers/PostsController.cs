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
using job_dut.Services.Posts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

//APIs
//1. All job(already paging) --// GET: api/jobs (role admin)
//1.1 all job(without job exprire): //GET: api/jobs/public
//2. All job base on CompanyID --// GET: api/jobs/company/{id} --> {id} is companyID (role admin)
//2.1 all job(without job exprire) base on CompanyID //GET: api/jobs/public/company/{id}
//3. All job base on FacultyID --// GET: api/jobs/faculty/{id} --> {id} is FacultyID (role admin)
//3.1 all job(without job exprire) base on FacultyID //GET: api/jobs/public/faculty/{id}
//4. All job of current user -- //GET: api/jobs/user (get job by username) (request login)
//5. Create new job (just role company) //POST api/jobs/user/create (request login)
//6. get post by postID -- // GET: api/jobs/public/{id} -- exception expire/isDisplay == false
//7. get post by postID -- // GET: api/jobs/{id} -- include expire/isDisplay(request login)
//8. review post -- // PUT: api/jobs/review/{id} -- 

namespace job_dut.Controllers
{
    [Route("api/jobs/")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        public IPostService PostService { get; }

        public IHttpContextAccessor HttpContextAccessor { get; }

        public PostsController(IPostService postService,
                               IHttpContextAccessor httpContextAccessor)
        {
            PostService = postService;
            HttpContextAccessor = httpContextAccessor;
        }

        // GET job list
        [HttpGet]
        //[Authorize(Policy = "admin")]
        public IActionResult GetAllJob(string PageNumber, string PageSize, string Sort, string Type)
        {
            //page default
            int numberOfPage = 1;
            int sizeOfPage = 10;
            string sortBy = "company";
            string typeBy = "asc";
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
            var model = PostService.PagingJobList(numberOfPage, sizeOfPage, sortBy, typeBy);

            Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = new PagingOutput
                {
                    Paging = model.GetHeader(),
                    Items = model.List.Select(post => (object)PostService.ConvertPostToPostDTO(post)).ToList()
                }
            });
        }

        //all
        // GET jobs which allow display(isDisplay==true) && still valid (DateExpire >= Now
        [HttpGet, Route("public")]
        [AllowAnonymous]
        public IActionResult GetJobWithoutJobExpire(string PageNumber, string PageSize)
        {
            //page default
            int numberOfPage = 1;
            int sizeOfPage = 10;

            //check validate of page
            if (PageNumber != null && PageSize != null && Regex.IsMatch(PageNumber, @"^\d+$") && Regex.IsMatch(PageSize, @"^\d+$"))
            {
                numberOfPage = Convert.ToInt32(PageNumber);
                sizeOfPage = Convert.ToInt32(PageSize);
            }

            var model = PostService.PagingJobWithoutJobExpire(numberOfPage, sizeOfPage);

            Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());

            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = new PagingOutput
                {
                    Paging = model.GetHeader(),
                    Items = model.List.Select(post => (object)PostService.ConvertPostToPostDTO(post)).ToList()
                }
            });
        }

        [HttpGet, Route("company/{id}")]
        //[Authorize(Policy = "admin")]
        public IActionResult GetJobOfCompany(string id, string PageNumber, string PageSize)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                //page default
                int numberOfPage = 1;
                int sizeOfPage = 10;

                //check validate of page
                if (PageNumber != null && PageSize != null && Regex.IsMatch(PageNumber, @"^\d+$") && Regex.IsMatch(PageSize, @"^\d+$"))
                {
                    numberOfPage = Convert.ToInt32(PageNumber);
                    sizeOfPage = Convert.ToInt32(PageSize);
                }

                var model = PostService.PagingJobOfCompany(Convert.ToInt32(id), numberOfPage, sizeOfPage);

                Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = new PagingOutput
                    {
                        Paging = model.GetHeader(),
                        Items = model.List.Select(post => (object)PostService.ConvertPostToPostDTO(post)).ToList()
                    }
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }

        //public
        // GET jobs which allow display(isDisplay==true) && still valid (DateExpire >= Now => base on CompanyID
        [HttpGet, Route("public/company/{id}")]
        //[Authorize]
        public IActionResult GetJobOfCompanyWithoutJobExpire(string id, string PageNumber, string PageSize)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                //page default
                int numberOfPage = 1;
                int sizeOfPage = 10;

                //check validate of page
                if (PageNumber != null && PageSize != null && Regex.IsMatch(PageNumber, @"^\d+$") && Regex.IsMatch(PageSize, @"^\d+$"))
                {
                    numberOfPage = Convert.ToInt32(PageNumber);
                    sizeOfPage = Convert.ToInt32(PageSize);
                }

                var model = PostService.PagingJobOfCompanyWithoutJobExpire(Convert.ToInt32(id), numberOfPage, sizeOfPage);

                Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = new PagingOutput
                    {
                        Paging = model.GetHeader(),
                        Items = model.List.Select(post => (object)PostService.ConvertPostToPostDTO(post)).ToList()
                    }
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }

        [HttpGet, Route("faculty/{id}")]
        //[Authorize(Policy = "admin")]
        public IActionResult GetJobOfFaculty(string id, string PageNumber, string PageSize)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                //page default
                int numberOfPage = 1;
                int sizeOfPage = 1000;

                //check validate of page
                if (PageNumber != null && PageSize != null && Regex.IsMatch(PageNumber, @"^\d+$") && Regex.IsMatch(PageSize, @"^\d+$"))
                {
                    numberOfPage = Convert.ToInt32(PageNumber);
                    sizeOfPage = Convert.ToInt32(PageSize);
                }

                var model = PostService.PagingJobOfFaculty(Convert.ToInt32(id), numberOfPage, sizeOfPage);

                Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = new PagingOutput
                    {
                        Paging = model.GetHeader(),
                        Items = model.List.Select(post => (object)PostService.ConvertPostToPostDTO(post)).ToList()
                    }
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }

        //public
        // GET jobs which allow display(isDisplay==true) && still valid (DateExpire >= Now => base on CompanyID
        [HttpGet, Route("public/faculty/{id}")]
        //[Authorize]
        public IActionResult GetJobOfFacultyWithoutJobExpire(string id, string PageNumber, string PageSize)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                //page default
                int numberOfPage = 1;
                int sizeOfPage = 10;

                //check validate of page
                if (PageNumber != null && PageSize != null && Regex.IsMatch(PageNumber, @"^\d+$") && Regex.IsMatch(PageSize, @"^\d+$"))
                {
                    numberOfPage = Convert.ToInt32(PageNumber);
                    sizeOfPage = Convert.ToInt32(PageSize);
                }

                var model = PostService.PagingJobOfFacultyWithoutJobExpire(Convert.ToInt32(id), numberOfPage, sizeOfPage);

                Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = new PagingOutput
                    {
                        Paging = model.GetHeader(),
                        Items = model.List.Select(post => (object)PostService.ConvertPostToPostDTO(post)).ToList()
                    }
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }

        //role ==> company :(
        // GET jobs which allow display(isDisplay==true) && still valid (DateExpire >= Now => base on CompanyID
        [HttpGet, Route("user")]
        [Authorize]
        public IActionResult GetJobManageByCurrentUser(string PageNumber, string PageSize, string Sort, string Type)
        {
            //page default
            int numberOfPage = 1;
            int sizeOfPage = 10;
            string sortBy = "create";
            string typeBy = "asc";

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

            var model = PostService.GetJobManageByCurrentUser(HttpContextAccessor.HttpContext.User.Identity.Name, numberOfPage, sizeOfPage, sortBy, typeBy);

            Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = new PagingOutput
                {
                    Paging = model.GetHeader(),
                    Items = model.List.Select(post => (object)PostService.ConvertPostToPostDTO(post)).ToList()
                }
            });
        }


        [HttpGet, Route("{id}")]
        //[Authorize]
        public IActionResult GetJobByPostID(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = PostService.ConvertPostToPostDTO(PostService.FindByPostID(Convert.ToInt32(id), true))
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }

        //role ==> company :(
        // GET jobs which allow display(isDisplay==true) && still valid (DateExpire >= Now => base on CompanyID
        [HttpGet, Route("public/{id}")]
        public IActionResult GetJobByPostIDWithoutJobExprire(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = PostService.ConvertPostToPostDTO(PostService.FindByPostID(Convert.ToInt32(id), false)) //exception expire/isDisplay == false
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }

        //create post
        [HttpPost, Route("user/create")]
        [Authorize]
        public IActionResult CreateJob([FromBody] PostAddDTO post)
        {
            if (ModelState.IsValid)
            {
                PostService.CreateJob(post, HttpContextAccessor.HttpContext.User.Identity.Name);
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }

        //update post
        //update by user manage this company
        //{id} is postID
        [HttpPut, Route("user/{id}")]
        [Authorize]
        public IActionResult UpdateJob([FromBody] PostAddDTO post, string id)
        {
            if (ModelState.IsValid && Regex.IsMatch(id, @"^\d+$"))
            {
                PostService.UpdateJob(post, Convert.ToInt32(id), HttpContextAccessor.HttpContext.User.Identity.Name);
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }

        //delete job -- // for company
        [HttpDelete, Route("user/{id}")]
        [Authorize]
        public IActionResult DeleteJob(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                PostService.DeleteJob(Convert.ToInt32(id), HttpContextAccessor.HttpContext.User.Identity.Name);
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }


        //review job -- //just admin -- //{id} of job
        [HttpPut, Route("review/{id}")]
       // [Authorize]
        public IActionResult ReviewPost(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                PostService.ReviewJob(Convert.ToInt32(id));
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                return BadRequest(new CustomException("400", "Something error!"));
            }

        }

        // get top 8 jobs
        [HttpGet, Route("public/top8")]
        public IActionResult GetTop8Job()
        {
            
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = PostService.Top8JobsPublic()//exception expire/isDisplay == false
                });

        }
    }
}