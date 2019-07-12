using AutoMapper;
using job_dut.DTO;
using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Role, RoleDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<ProfileUser, ProfileUserDTO>();
            CreateMap<Company, CompanyDTO>();
            CreateMap<Post, PostDTO>();
            //CreateMap<CompanyAddDTO, Company>();
        }
    }
}
