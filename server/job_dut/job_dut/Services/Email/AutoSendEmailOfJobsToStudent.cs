using job_dut.Databases;
using job_dut.Models;
using job_dut.Services.Posts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace job_dut.Services.Email
{
    public class AutoSendEmailOfJobsToStudent : IHostedService
    {
        //public DataContext DataContext { get; }
        //public IPostService PostService { get; }

        public AutoSendEmailOfJobsToStudent()
        {
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            Task.Run(TaskRoutine, cancellationToken);
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
        public Task TaskRoutine()
        {

            while (true)
            {
                //Do what ever you want to do all 10 Minutes
                //sendEmail();
                //find list job in month

                JobsEmailSender send = new JobsEmailSender();


                //Wait till next execution
                string dateSend = DateTime.Now.Month + "/10/" + DateTime.Now.Year + " 03:53 PM";
                
                DateTime nextStop = DateTime.Parse(dateSend);
                var timeToWait = nextStop - DateTime.Now;
                var millisToWait = timeToWait.TotalMilliseconds;
                Thread.Sleep((int)millisToWait);
                send.SendEmailAsync("nguyenthithanhtuyenbkdn@gmail.com", "New Jobs for Your Skills.",
                    "<br>Here is a list of best jobs that matches your subscribed skills.<br>" +
                    "<a href='http://localhost:4200/index'>Android Dev Internship</a><br>" +
                    "<a href='http://localhost:4200/index'>React Native Developer (IOS/ Android)</a><br><br>" +
                    "Wish you the best of luck in your job search!<br><br>Thanks and Best regards,<br><b>DUT JOB Team</b>");
            }
        }
    }
}
