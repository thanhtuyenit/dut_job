using job_dut.DTO;
using job_dut.Models;
using job_dut.PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Services.Posts
{
    public interface IPostService
    {
        PostDTO ConvertPostToPostDTO(Post post);

        List<Post> GetAll(bool check);

        List<Post> GetJobByCompanyID(long companyID, bool check);

        List<Post> GetJobByFacultyID(long facultyID, bool check);
        
        Post FindByPostID(long postID, bool check);

        Post FindByPostIDAndCompanyID(long postID, long companyID, bool check);

        //all job
        PagedList<Post> PagingJobList(int pageNumber, int pageSize, string sort, string type);

        PagedList<Post> PagingJobWithoutJobExpire(int pageNumber, int pageSize);

        //job by companyID
        PagedList<Post> PagingJobOfCompany(long companyId, int pageNumber, int pageSize);

        PagedList<Post> PagingJobOfCompanyWithoutJobExpire(long companyID, int pageNumber, int pageSize);

        //job by FacultyID
        PagedList<Post> PagingJobOfFaculty(long facultyID, int pageNumber, int pageSize);

        PagedList<Post> PagingJobOfFacultyWithoutJobExpire(long facultyID, int pageNumber, int pageSize);

        PagedList<Post> GetJobManageByCurrentUser(string username, int numberOfPage, int sizeOfPage, string Sort, string Type);

        void CreateJob(PostAddDTO post, string username);

        void UpdateJob(PostAddDTO post, long postID,string username);

        void DeleteJob(long postID, string username);

        void ReviewJob(long postID);

        List<PostDTO> Top8JobsPublic();
    }
}
