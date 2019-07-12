using Microsoft.AspNetCore.Identity.UI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;

namespace job_dut.Services.Email
{
    public class ApplyJobEmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage, string file)
        {
            var client = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                EnableSsl = true,
                Credentials = new NetworkCredential("youremail@gmail.com", "youremail"), //email and password of this email
                
        };
            var mailMessage = new MailMessage
            {
                From = new MailAddress("youremail@gmail.com"),
                IsBodyHtml = true
            };
            mailMessage.To.Add(email);
            mailMessage.Subject = subject;
            mailMessage.Body = htmlMessage;
            Attachment data = new Attachment(file, MediaTypeNames.Application.Octet);
            // your path may look like Server.MapPath("~/file.ABC")
            mailMessage.Attachments.Add(data);
            return client.SendMailAsync(mailMessage);
        }

        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            throw new NotImplementedException();
        }
    }
}
