using job_dut.DTO;
using job_dut.Models;
using job_dut.PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.Searches
{
    public interface ISearchService
    {
        ResponseSearchDTO SearchJobOrCompany(string keyword);

        List<CompanyNameDTO> AllCompanyName();

        ResponseJobSearchDTO SearchJob(string keyword);

        List<KeySuggestSearch> ListKeyWordSuggestToSearch();

        PagedList<Post> PagingJobSearch(string keyword, int PageNumber, int PageSize);

        PostDTO Convert(Post post);
    }
}
