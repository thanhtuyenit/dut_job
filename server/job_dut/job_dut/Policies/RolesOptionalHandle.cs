using job_dut.Exceptions;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace job_dut.Policies
{
    public class RolesOptionalHandle : AuthorizationHandler<RolesOptional>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RolesOptional requirement)
        {
            if (!context.User.HasClaim(c => c.Type == ClaimTypes.Role))
            {
                return Task.CompletedTask;
            }

            var role = Convert.ToInt32(context.User.FindFirst(c => c.Type == ClaimTypes.Role).Value);

            if (role != requirement.Role)
            {
                throw new CustomException("403", "403 Forbidden.");
            }
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}
