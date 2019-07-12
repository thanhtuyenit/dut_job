using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Models;
using job_dut.Responses;
using job_dut.Services.OvertimeTypes;
using job_dut.Services.Roles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace job_dut.Controllers
{
    [Route("api/type/")]
    [ApiController]
    public class OvertimeTypeControlle : ControllerBase
    {
        public IOvertimeTypeService OvertimeTypeService { get; }
        public OvertimeTypeControlle(IOvertimeTypeService overtimeTypeService)
        {
            OvertimeTypeService = overtimeTypeService;
        }
        // GET api/values
        [HttpGet]
        [Route("overtimes")]
        //[Authorize]
        public IActionResult GetAll()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = OvertimeTypeService.GetAll()
            });
        }
    }
}