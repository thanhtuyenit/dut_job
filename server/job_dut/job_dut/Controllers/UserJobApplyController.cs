using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Exceptions;
using job_dut.Models;
using job_dut.Responses;
using job_dut.Services.AppliedJobs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace job_dut.Controllers
{
    [Route("api/jobs/")]
    public class UserJobApplyController : Controller
    {
       
        public IHttpContextAccessor HttpContextAccessor { get; }

        public IUserJobApplyService UserJobAppliedService { get; }

        public UserJobApplyController(IUserJobApplyService userJobAppliedService,
                                      IHttpContextAccessor httpContextAccessor)
        {
            UserJobAppliedService = userJobAppliedService;
            HttpContextAccessor = httpContextAccessor;
        }

        [HttpGet, Route("applied/user")]
        public IActionResult ListJobAppliedCurrentUser()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = UserJobAppliedService.ListJobAppliedCurrentUser(HttpContextAccessor.HttpContext.User.Identity.Name)
        });
        }

        [HttpPost, Route("apply")]
        public IActionResult ApplyJob([FromBody] UserJobApply userJobApply)
        {
            if (ModelState.IsValid)
            {
                UserJobAppliedService.ApplyJob(userJobApply, HttpContextAccessor.HttpContext.User.Identity.Name);
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