using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using job_dut.Databases;
using job_dut.DTO;
using job_dut.Models;

namespace job_dut.Services.Roles
{
    public class RoleService : IRoleService
    {
        public DataContext DataContext { get; }
        public IMapper Mapper { get; }
        public RoleService(DataContext dataContext,
                           IMapper mapper)
        {
            DataContext = dataContext;
            Mapper = mapper;
        }
        public List<RoleDTO> GetAll()
        {
            //_mapper.Map<List<User>, List<UserDTO>>(userListAll)
            return Mapper.Map<List<Role>, List<RoleDTO>>(DataContext.Roles.Where(role => !role.DeleteFlag).ToList());
        }
        public Role FindByName(string name)
        {
            //_mapper.Map<List<User>, List<UserDTO>>(userListAll)
            return DataContext.Roles.FirstOrDefault(role => !role.DeleteFlag && role.Name == name);
        }
    }
}
