using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Databases;
using job_dut.DTO;
using job_dut.Responses;
using job_dut.Services.Dashboards;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace job_dut.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        public IDashboardService DashboardService { get; }

        public DashboardController(IDashboardService dashboardService)
        {
            DashboardService = dashboardService;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Index()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                //Data = new DashboardDTO
                //{
                //    TotalCompany = 1,
                //    TotalJob = 1,
                //    TotalStudent = 1, 
                //    TotalReview = 0
                //}
                Data = DashboardService.DashboardInfor()
            });
        }
    }
}