using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_dut.Models;

namespace job_dut.Services.Facultys
{
    public interface IFacultyService
    {
        List<Faculty> GetAll();

        void Create(Faculty faculty);

        Faculty GetFacultyByID(long id);

        void Update(Faculty faculty, long id);

        void Delete(long id);

        Faculty FindByName(string name);

        List<Faculty> Top4Faculty();
    }
}
