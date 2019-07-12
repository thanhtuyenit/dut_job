using job_dut.Models;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Policies
{
    public class RolesOptional : IAuthorizationRequirement
    {
        public int Role { get; private set; }

        public RolesOptional(int roleName)
        {
            Role = roleName;
        }
    }
}
