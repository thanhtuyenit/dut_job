using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.DTO;
using job_dut.Models;

namespace job_dut.Services.Roles
{
    public interface IRoleService
    {
        List<RoleDTO> GetAll();

        Role FindByName(string name);
    }
}
