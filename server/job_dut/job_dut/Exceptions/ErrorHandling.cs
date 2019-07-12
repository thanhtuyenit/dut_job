using job_dut.Responses;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace job_dut.Exceptions
{
    public class ErrorHandling
    {
        private readonly RequestDelegate next;

        public ErrorHandling(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            var result = string.Empty;
            if (exception is CustomException ex)
            {
                code = (HttpStatusCode) Convert.ToUInt16(ex.Code);
                result = JsonConvert.SerializeObject(new APIResponses
                {
                    Code = Convert.ToUInt16(ex.Code),
                    Message = exception.Message,
                    Data = null
                });
            }
            else
            {
                result = JsonConvert.SerializeObject(new APIResponses
                {
                    Code = 500,
                    Message = "500 Internal Server Error.",
                    Data = null
                });
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}
