using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Databases;
using job_dut.DTO;
using job_dut.Exceptions;
using job_dut.Models;
using job_dut.Services.Email;
using job_dut.Services.Users;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace job_dut.Services.AppliedJobs
{
    public class UserJobApplyService : IUserJobApplyService
    {
        private IHostingEnvironment HostingEnvironment { get; }

        public DataContext DataContext { get; }

        public IUserService UserService { get; }

        public UserJobApplyService(DataContext dataContext,
                                   IUserService userService,
                                   IHostingEnvironment hostingEnvironment)
        {
            DataContext = dataContext;
            UserService = userService;
            HostingEnvironment = hostingEnvironment;
        }
        public List<UserJobApplyDTO> ListJobAppliedCurrentUser(string username)
        {
            //find current user by username
            User currentUser = DataContext.Users.SingleOrDefault(u => u.Username.Equals(username) && !u.DeleteFlag);

            List<UserJobApply> userJobApplyList= DataContext.UserJobApplies.Where(uj => uj.UserID == currentUser.ID).OrderByDescending(p => p.CreatedAt)
                                             .ToList();
            List<UserJobApplyDTO> result = new List<UserJobApplyDTO>();
            foreach (UserJobApply userJobApply in userJobApplyList)
            {
                //find POST by postID
                Post post = DataContext.Posts.FirstOrDefault(p => p.ID == userJobApply.PostID);
                result.Add(new UserJobApplyDTO
                {
                    UserID = userJobApply.UserID,
                    PostID = userJobApply.PostID,
                    JobName = post.Title,
                    CreatedAt = userJobApply.CreatedAt,
                    CoverLetter = userJobApply.CoverLetter,
                    AcceptView = post.DateExpire > DateTime.Now ? true : false
                });
            }
            return result;
        }

        public void ApplyJob(UserJobApply userJobApply, string username)
        {
            //find current user by username
            User currentUser = DataContext.Users.SingleOrDefault(u => u.Username.Equals(username) && !u.DeleteFlag);
            ProfileUser profile;
            if(currentUser == null)
            {
                throw new CustomException("400", "Something error!");
            }
            else
            {
                //Get profile by UserID
                 profile = DataContext.ProfileUsers.FirstOrDefault(up => up.UserID == currentUser.ID);
            }

            //find POST by postID
            Post post = DataContext.Posts.Include(c => c.Company).ThenInclude(u => u.User)
                                        .FirstOrDefault(p => p.ID == userJobApply.PostID);

            if(post.DateExpire > DateTime.Now)
            {
                //check this user apply or no
                UserJobApply userJobApplyOld = DataContext.UserJobApplies.FirstOrDefault(uj => uj.PostID == userJobApply.PostID &&
                                    uj.UserID == currentUser.ID);

                if (userJobApplyOld == null)
                {
                    //OK
                    //Not yet apply =>add new
                    UserJobApply userJobApplyAdd = new UserJobApply
                    {
                        CreatedAt = DateTime.Now,
                        UserID = currentUser.ID,
                        CoverLetter = userJobApply.CoverLetter,
                        PostID = userJobApply.PostID,
                    };
                    //send email

                    DataContext.Add(userJobApplyAdd);
                    DataContext.SaveChanges();

                    string folderName = "cv";
                    string webRootPath = HostingEnvironment.WebRootPath;
                    string newPath = Path.Combine(webRootPath, folderName);
                    //send email to compnany
                    ApplyJobEmailSender send = new ApplyJobEmailSender();
                    send.SendEmailAsync(post.Company.User.Username, "Have a New Candidate for Your Company.",
                        "<span>Congratulation your company!</span><br>We have found for your company a new candidate.<br><br><b>" + post.Title
                        + "</b><br><lable>Cadidate: </lable>" + profile.Fullname
                        + "<br><lable>Cover letter: </lable>" + userJobApply.CoverLetter
                        + "<br><br><b>We also include candidate's CV for your company.</b><br>Best regards,<br>DUT JOB Team", newPath + "\\" + profile.CVLink);
                }
                else
                {
                    //Update
                    userJobApplyOld.CoverLetter = userJobApply.CoverLetter;
                    DataContext.Update(userJobApplyOld);
                    DataContext.SaveChanges();
                    //send email to compnany
                    string folderName = "cv";
                    string webRootPath = HostingEnvironment.WebRootPath;
                    string newPath = Path.Combine(webRootPath, folderName);
                    ApplyJobEmailSender send = new ApplyJobEmailSender();
                    //send.SendEmailAsync(post.Company.User.Username, "Have a New Candidate for Your Company.",
                    //    "<span>Congratulation for your company!</span><br>We have found a new candidate for your company.", newPath + "\\" + profile.CVLink);
                    //send.SendEmailAsync(post.Company.User.Username, "Have a New Candidate for Your Company.",
                    //    "<span>Congratulation your company!</span><br>We have found for your company a new candidate.<br><b>" + post.Title
                    //    + "</b><br><lable>Cadidate: </lable>" + profile.Fullname
                    //    + "<br><lable>Cover letter: </lable>" + userJobApply.CoverLetter
                    //    + "We also include candidate's CV for your company.<br><br>Best regards,<br>DUT JOB Team", newPath + "\\" + profile.CVLink
                    send.SendEmailAsync(post.Company.User.Username, "Have a New Candidate for Your Company.",
                        "<span>Congratulation for your company!</span><br>We have found for your company a new candidate.<br><br><b>" + post.Title
                        + "</b><br><lable>Cadidate: </lable>" + profile.Fullname
                        + "<br><lable>Cover letter: </lable>" + userJobApply.CoverLetter
                        + "<br><br><b>We also include candidate's CV for your company.</b><br>Best regards,<br>DUT JOB Team", newPath + "\\" + profile.CVLink);

                }

            }
            else
            {
                throw new CustomException("400", "Exprite to apply!");
            }
            
        }
    }
}
