using job_dut.PagedList;
using job_dut.Responses;
using job_dut.Services.Searches;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace job_dut.Controllers
{
    [Route("api/")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        public ISearchService SearchService { get; set; }

        public SearchController(ISearchService searchService)
        {
            SearchService = searchService;
        }
        
        [HttpGet]
        [Route("search/jobs")]
        public IActionResult Search(string keyword, string PageNumber, string PageSize)
        {
            int numberOfPage = 1;
            int sizeOfPage = 20;

            if (PageNumber != null && PageSize != null && Regex.IsMatch(PageNumber, @"^\d+$") && Regex.IsMatch(PageSize, @"^\d+$"))
            {
                numberOfPage = Convert.ToInt32(PageNumber);
                sizeOfPage = Convert.ToInt32(PageSize);
            }
            var model = SearchService.PagingJobSearch(keyword, numberOfPage, sizeOfPage);

            Response.Headers.Add("X-Pagination", model.GetHeader().ToJson());
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = new PagingOutput
                {
                    Paging = model.GetHeader(),
                    Items = model.List.Select(post => (object)SearchService.Convert(post)).ToList()
                }
            });
            //return Ok(new APIResponses
            //{
            //    Code = 200,
            //    Message = "Success!",
            //    Data = SearchService.SearchJob(keyword)
            //});
            // return Ok();
        }

        [HttpGet]
        [Route("all/company/name")]
        public IActionResult AllCompanyName()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = SearchService.AllCompanyName()
            });
            // return Ok();
        }

        [HttpGet]
        [Route("search/key-suggest")]
        public IActionResult ListKeyWordSuggestToSearch()
        {
            return Ok(new APIResponses
            {
                Code = 200,
                Message = "Success!",
                Data = SearchService.ListKeyWordSuggestToSearch()
            });
            // return Ok();
        }
    }
}