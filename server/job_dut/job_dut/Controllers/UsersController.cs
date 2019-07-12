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
using job_dut.Services.ProfileUsers;
using job_dut.Services.Roles;
using job_dut.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace job_dut.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public IUserService UserService { get; }

        public IProfileUserService ProfileUserService { get; }

        public IHttpContextAccessor HttpContextAccessor { get; }
        
        public UsersController(IUserService userService,
                               IProfileUserService profileUserService,
                               IHttpContextAccessor httpContextAccessor)
        {
            UserService = userService;
            ProfileUserService = profileUserService;
            HttpContextAccessor = httpContextAccessor;
        }


        // GET user list
        [HttpGet]
        [Route("users")]
        //[Authorize]
        public IActionResult GetUserList(string PageNumber, string PageSize, string Sort, string Type)
        {
            //page default
            int numberOfPage = 1;
            int sizeOfPage = 10;
            string sortBy = "username";
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

            var model = UserService.PagingStudentList(numberOfPage, sizeOfPage, sortBy, typeBy);
            Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = new PagingOutput
                {
                    Paging = model.GetHeader(),
                    Items = model.List.Select(user => (object) ProfileUserService.GetProfileUserDTO(user)).ToList()
                }
            });
        }

        //create new account
        //regiter account by guest
        [HttpPost, Route("users/register")]
        public IActionResult Register([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                UserService.Register(user);
              //  ProfileUserService.CreateProfileUser(user.Username);
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

        [HttpPut, Route("users/password")]
        public IActionResult UpdatePassword([FromBody] UpdatePassword updatePassword)
        {
            if (ModelState.IsValid)
            {
                UserService.UpdatePassword(updatePassword, HttpContextAccessor.HttpContext.User.Identity.Name);
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                return BadRequest(new CustomException("400","Something error!"));
            }
            
        }

        //block or unblock account of user
        [HttpPut, Route("users/review/{id}")]
        //[Authorize]
        public IActionResult UserReview(string id)
        {
            if (ModelState.IsValid && Regex.IsMatch(id, @"^\d+$"))
            {
                UserService.UserReview(Convert.ToUInt32(id));
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