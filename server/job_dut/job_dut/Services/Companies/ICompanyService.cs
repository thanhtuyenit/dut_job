using job_dut.DTO;
using job_dut.Models;
using job_dut.PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.Companies
{
    public interface ICompanyService
    {
        List<Company> GetAll();

        Company FindByCompanyID(long companyID);

        List<Company> FindByFacultyID(long facultyID);

        CompanyDTO FindByCompanyIDDTO(long companyID);

        List<CompanyDTO> GetListCompanyDTO();

        PagedList<Company> PagingCompanyList(int numberOfPage, int sizeOfPage);

        PagedList<Company> PagingCompanyConditionList(int PageNumber, int PageSize, string Sort, string Type);

        CompanyDTO ConvertCompanyToCompanyDTO(Company company);

        void Register(CompanyAddDTO company);

        void Update(Company company, long companyID);

        void CompanyReview(long companyID);

        CompanyDTO GetCompanyofUserDTO(string username);

        void AddSkillOfCompany(KeySkill keySkill, string username);

        void RemoveSkillOfCompany(long skillID, string username);

        bool FindByCompanyIDAndUserID(long companyID, long userID);

        List<CompanyDTO> FindByFacultyIDDTO(long facultyID);

        Company FindByUserID(long iD);
    }
}
