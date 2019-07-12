using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.DTO;
using job_dut.Models;
using job_dut.PagedList;

namespace job_dut.Services.Users
{
    public interface IUserService
    {
        List<User> GetAll();

        bool CheckLogin(User user);

        User FindByUsername(string username);

        User FindByUserID(long userID);

        void Register(User user);

        TokenDTO CreateToken(User user);

        PagedList<User> PagingUserList(int PageNumber, int PageSize, string Sort, string Type);

        //get all student roleID = 2
        PagedList<User> PagingStudentList(int PageNumber, int PageSize, string Sort, string Type);

        void UpdatePassword(UpdatePassword updatePassword, string username);

        void ChangeRoleOfUser(long userID);

        void UserReview(long userID);
    }
}
