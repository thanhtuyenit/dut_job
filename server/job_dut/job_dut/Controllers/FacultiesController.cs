using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Responses;
using job_dut.Services.Facultys;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using job_dut.Models;
using job_dut.Exceptions;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;

namespace job_dut.Controllers
{
    [Route("api/faculties")]
    [ApiController]
    public class FacultiesController : ControllerBase
    {
        public IFacultyService FacultyService { get; }

        public FacultiesController(IFacultyService facultyService)
        {
            FacultyService = facultyService;
        }


        // GET api/values
        [HttpGet]
        public APIResponses GetAll()
        {
            return new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = FacultyService.GetAll()
            };
        }

        [HttpPost, Route("create")]
        //[Authorize]
        public IActionResult Create([FromBody] Faculty faculty)
        {
            if (ModelState.IsValid)
            {
                FacultyService.Create(faculty);
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
        public IActionResult GetFacultyByID(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                Faculty faculty = FacultyService.GetFacultyByID(Convert.ToInt64(id));
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = faculty
                });
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }

        }

        [HttpPut, Route("{id}")]
        //[Authorize]
        public IActionResult Update([FromBody] Faculty faculty, string id)
        {
            if (ModelState.IsValid && Regex.IsMatch(id, @"^\d+$"))
            {
                FacultyService.Update(faculty, Convert.ToInt64(id));
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
        //[Authorize]
        public IActionResult Delete(string id)
        {
            if (Regex.IsMatch(id, @"^\d+$"))
            {
                FacultyService.Delete(Convert.ToInt64(id));
                return Ok(new APIResponses
                {
                    Code = 200,
                    Message = "Success!",
                    Data = null
                });
            }
            else
            {
                throw new CustomException("400", "Somthing error!");
            }

        }

        //get top 4 faculty base on total post.
        //
        [HttpGet, Route("top4")]
        //[Authorize]
        public IActionResult Top4Faculty()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = FacultyService.Top4Faculty()
            });

        }

    }
}