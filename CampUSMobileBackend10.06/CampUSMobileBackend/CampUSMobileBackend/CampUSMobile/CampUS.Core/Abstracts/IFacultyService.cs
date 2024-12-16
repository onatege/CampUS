using System.Linq.Expressions;
using CampUS.Core.Models;
using CampUS.DTO.Request.Faculty;
using CampUS.DTO.Response.Faculty;

namespace CampUS.Core.Abstracts
{

    public interface IFacultyService : IGenericService<Faculty, AddFacultyDto, UpdateFacultyDto, RemoveFacultyDto, FacultyDto>
    {
        Task<IEnumerable<FacultyDto>> GetAllDepartmentsWithFaculty(Expression<Func<Faculty, bool>> expression);
    }
}