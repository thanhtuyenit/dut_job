using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Models;
using job_dut.Responses;
using job_dut.Services.Roles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace job_dut.Controllers
{
    [Route("api/")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        public IRoleService RoleService { get; }

        public RolesController(IRoleService roleService)
        {
            RoleService = roleService;
        }

        // GET api/values
        [HttpGet]
        [Route("roles")]
        //[Authorize]
        public IActionResult GetAll()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = RoleService.GetAll()
            });
        }
    }
}