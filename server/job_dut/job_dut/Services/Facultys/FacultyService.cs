using AutoMapper;
using job_dut.Commons;
using job_dut.Databases;
using job_dut.DTO;
using job_dut.Exceptions;
using job_dut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace job_dut.Services.Facultys
{
    public class FacultyService : IFacultyService
    {
        public DataContext DataContext { get; }

        public IMapper Mapper { get; }


        public FacultyService(DataContext dataContext,
                              IMapper mapper)
        {
            DataContext = dataContext;
            Mapper = mapper;
        }


        public List<Faculty> GetAll()
        {
            return DataContext.Faculties.Where(faculty => !faculty.DeleteFlag).ToList();
        }


        public void Create(Faculty faculty)
        {
            faculty.Name = CustomString.CustomStr(faculty.Name);
            faculty.Description = CustomString.CustomStr(faculty.Description);
            //can't add name with name Others.
            if (!faculty.Name.Equals("Others"))
            {
                faculty.CreatedAt = DateTime.Now;
                faculty.UpdatedAt = DateTime.Now;
                faculty.DeleteFlag = false;
                DataContext.Faculties.Add(faculty);
                DataContext.SaveChanges();
            }
            else
            {
                throw new CustomException("400", "Name not null!");
            }

        }


        public Faculty GetFacultyByID(long id)
        {
            Faculty faculty = DataContext.Faculties.SingleOrDefault(x => x.ID == id && !x.DeleteFlag);
            if (faculty != null)
            {
                return faculty;
            }
            else
            {
                throw new CustomException("400", "Something error!");
            }

        }


        public void Update(Faculty faculty, long id)
        {
            faculty.Name = CustomString.CustomStr(faculty.Name);
            faculty.Description = CustomString.CustomStr(faculty.Description);
            if (faculty.Name != null)
            {
                Faculty facultyOld = GetFacultyByID(id);

                // still keep faculty with the name is "Others"
                facultyOld.Name = facultyOld.ID == 1 ? facultyOld.Name : faculty.Name;
                facultyOld.Description = faculty.Description;
                facultyOld.UpdatedAt = DateTime.Now;
                DataContext.Faculties.Update(facultyOld);
                DataContext.SaveChanges();
            }
            else
            {
                throw new CustomException("400", "Name not null!");
            }

        }


        public void Delete(long id)
        {
            if (id == 1)
            {
                //can't delete 
                throw new CustomException("400", "Something error!");
            }
            Faculty facultyOld = GetFacultyByID(id);
            facultyOld.DeleteFlag = true;
            facultyOld.UpdatedAt = DateTime.Now;
            DataContext.Faculties.Update(facultyOld);
            DataContext.SaveChanges();
        }

        public Faculty FindByName(string name)
        {
            return DataContext.Faculties.FirstOrDefault(x => !x.DeleteFlag && x.Name.Equals(name));
        }

        public List<Faculty> Top4Faculty()
        {
            List<Faculty> top4 = new List<Faculty>();
            foreach (var line in DataContext.Posts.Where(p => p.DateExpire >= DateTime.Now && p.IsDisplay && !p.DeleteFlag).GroupBy(info => info.FacultyID)
                        .Select(group => new TopDTO {
                            ID = group.Key,
                            Number = group.Count()
                        })
                        .OrderByDescending(x => x.Number).Take(4))
            {
                top4.Add(GetFacultyByID(line.ID));
            }
            return top4;
        }
    }
}
