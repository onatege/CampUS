using System.Linq.Expressions;
using AutoMapper;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Department;
using Microsoft.EntityFrameworkCore;
using CampUS.DTO.Response.Department;

namespace CampUS.Service.Concrete
{

    public class DepartmentService : GenericService<Department, AddDepartmentDto, UpdateDepartmentDto, RemoveDepartmentDto, DepartmentDto>, IDepartmentService
    {
        public DepartmentService(IMapper mapper, IGenericRepository<Department> genericRepository, IUnitOfWork unitOfWork) : base(mapper, genericRepository, unitOfWork)
        {
        }

        public async Task<IEnumerable<Department>> GetAllDepartmentsWithUsers(Expression<Func<Department, bool>> expression)
        {
            return _genericRepository.Where(expression).Include(x => x.Users).AsEnumerable();
        }
    }
}