using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Responses;
using job_dut.Services.TypeJobServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace job_dut.Controllers
{
    [Route("api/type")]
    [ApiController]
    public class TypeJobsController : ControllerBase
    {
        public IJobTypeService TypeJobService { get; set; }

        public TypeJobsController(IJobTypeService typeJobService)
        {
            TypeJobService = typeJobService;
        }
        // GET api/type/jobs
        [HttpGet]
        [Route("jobs")]
        public IActionResult GetAll()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = TypeJobService.GetAll()
            });
        }
    }
}