using System.Linq.Expressions;
using CampUS.Core.Models;
using CampUS.DTO.Request.Department;
using CampUS.DTO.Response.Department;

namespace CampUS.Core.Abstracts
{
    public interface IDepartmentService : IGenericService<Department, AddDepartmentDto, UpdateDepartmentDto, RemoveDepartmentDto, DepartmentDto>
    {

        Task<IEnumerable<Department>> GetAllDepartmentsWithUsers(Expression<Func<Department, bool>> expression);
    }
}