using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using job_dut.Exceptions;
using job_dut.Models;
using job_dut.Responses;
using job_dut.Services.ProfileUsers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace job_dut.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ProfileUserController : ControllerBase
    {
        public IProfileUserService ProfileUserService { get; }

        public IHttpContextAccessor HttpContextAccessor { get; }

        public ProfileUserController(IProfileUserService profileUserService,
                                     IHttpContextAccessor httpContextAccessor)
        {
            ProfileUserService = profileUserService;
            HttpContextAccessor = httpContextAccessor;
        }


        [HttpGet]
        [Route("profile")]
        [Authorize]
        public IActionResult GetProfileByToken()
        {
            if (ModelState.IsValid)
            {
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = ProfileUserService.GetProfileByUsernameDTO(HttpContextAccessor.HttpContext.User.Identity.Name)
                });
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }

        //admin request view profile of user base UserID
        [HttpGet]
        [Route("profile/{id}")]
        //[Authorize]
        public IActionResult GetProfileByUserID(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = ProfileUserService.GetProfileByUserIDDTO(Convert.ToInt64(id))
                });
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }


        //update profile by token
        [HttpPut, Route("profile")]
        [Authorize]
        public IActionResult UpdateProfileByToken([FromBody] ProfileUser profileUser)
        {
            if (ModelState.IsValid)
            {
                ProfileUserService.UpdateProfileByToken(profileUser, HttpContextAccessor.HttpContext.User.Identity.Name);
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

        //update profile by token
        [HttpPut, Route("profile/skills")]
        [Authorize]
        public IActionResult AddKeySkillByToken([FromBody] KeySkill keySkill)
        {
            if (ModelState.IsValid)
            {
                ProfileUserService.AddSkillOfUser(keySkill, HttpContextAccessor.HttpContext.User.Identity.Name);
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

        //update profile by token
        [HttpDelete, Route("profile/skills/{id}")]
        [Authorize]
        public IActionResult RemoveKeySkillByToken(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                ProfileUserService.DeleteSkillOfUser(Convert.ToInt32(id), HttpContextAccessor.HttpContext.User.Identity.Name);
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