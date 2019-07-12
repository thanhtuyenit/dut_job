using job_dut.Commons;
using job_dut.Models;
using job_dut.Services.ProfileUsers;
using job_dut.Services.Users;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http.Headers;

namespace job_dut.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private IHostingEnvironment HostingEnvironment { get; }

        public IHttpContextAccessor HttpContextAccessor { get; }

        public IProfileUserService ProfileUserService { get; }

        public IUserService UserService { get; }

        public UploadController(IHostingEnvironment hostingEnvironment,
                                IHttpContextAccessor httpContextAccessor,
                                IProfileUserService profileUserService,
                                IUserService userService)
        {
            HostingEnvironment = hostingEnvironment;
            HttpContextAccessor = httpContextAccessor;
            ProfileUserService = profileUserService;
            UserService = userService;
        }

        [HttpPost, DisableRequestSizeLimit]
        public ActionResult UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                string folderName = "cv";
                string webRootPath = HostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string renameFile = RandString.RandomPassword() +"_"+ fileName;
                    string fullPath = Path.Combine(newPath, renameFile);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    //User user = UserService.FindByUsername(HttpContextAccessor.HttpContext.User.Identity.Name);
                    ProfileUserService.UploadCV(renameFile, HttpContextAccessor.HttpContext.User.Identity.Name);
                }
                return Json("Upload Successful.");
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }
    }
}