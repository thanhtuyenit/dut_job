using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Responses;
using job_dut.Services.Facultys;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using job_dut.Models;
using job_dut.Services.KeySkills;
using job_dut.Exceptions;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;

namespace job_dut.Controllers
{
    //[Authorize]
    [Route("api/skills")]
    [ApiController]
    public class KeySkillsController : ControllerBase
    {
        public IKeySkillService KeySkillService { get; }

        public IHttpContextAccessor HttpContextAccessor { get; }

        public KeySkillsController(IKeySkillService keySkillService,
                                   IHttpContextAccessor httpContextAccessor)
        {
            KeySkillService = keySkillService;
            HttpContextAccessor = httpContextAccessor;
        }


        // GET api/values
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = KeySkillService.GetAll()
            });
        }

        [HttpPost, Route("create")]
        //[Authorize(Policy = "admin")]
        public IActionResult Create([FromBody] KeySkill keySkill)
        {
            if (ModelState.IsValid)
            {
                KeySkillService.Create(keySkill);
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

        [HttpGet, Route("{id}")]
        public IActionResult GetKeySkillByID(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                KeySkill keySkill = KeySkillService.GetKeySkillByID(Convert.ToInt64(id));
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = keySkill
                });
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }
        }

        [HttpPut, Route("{id}")]
        //[Authorize(Policy = "admin")]
        public IActionResult Update([FromBody] KeySkill keySkill, string id)
        {
            if (ModelState.IsValid && Regex.IsMatch(id, @"^\d+$"))
            {
                KeySkillService.Update(keySkill, Convert.ToInt64(id));
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

        [HttpDelete, Route("{id}")]
       // [Authorize(Policy = "admin")]
        public IActionResult Delete(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                KeySkillService.Delete(Convert.ToInt64(id));
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

        // GET api/skills/add/user
        // [AllowAnonymous]
        [Authorize]
        [HttpGet,Route("add/user")]
        public IActionResult GetSkillCanAddForUser()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = KeySkillService.GetSkillCanAddForUser(HttpContextAccessor.HttpContext.User.Identity.Name)
            });
        }

        // GET api/skills/add/user
        // [AllowAnonymous]
        [Authorize]
        [HttpGet, Route("add/company")]
        public IActionResult GetSkillCanAddForCompany()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = KeySkillService.GetSkillCanAddForCompany(HttpContextAccessor.HttpContext.User.Identity.Name)
            });
        }
    }
}