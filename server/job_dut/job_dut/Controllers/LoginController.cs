using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using job_dut.Exceptions;
using job_dut.Models;
using job_dut.Responses;
using job_dut.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace job_dut.Controllers
{
    [AllowAnonymous]
    [Route("api/")]
    public class LoginController : Controller
    {
        private IUserService UserService { get; }
        public LoginController(IUserService userService)
        {
            UserService = userService;
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                if (UserService.CheckLogin(user))
                {
                    return Ok(new APIResponses
                    {
                        Code = 200,
                        Message = "Success!",
                        Data = UserService.CreateToken(user)
                    });
                }
                else
                {
                    throw new CustomException("400", "Something error!");
                }
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }

        }
    }
}