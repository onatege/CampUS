using System.Linq.Expressions;
using AutoMapper;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Faculty;
using CampUS.DTO.Response.Faculty;
using Microsoft.EntityFrameworkCore;

namespace CampUS.Service.Concrete
{

    public class FacultyService : GenericService<Faculty, AddFacultyDto, UpdateFacultyDto, RemoveFacultyDto, FacultyDto>, IFacultyService
    {
        public FacultyService(IMapper mapper, IGenericRepository<Faculty> genericRepository, IUnitOfWork unitOfWork) : base(mapper, genericRepository, unitOfWork)
        {
        }

        public async Task<IEnumerable<FacultyDto>> GetAllDepartmentsWithFaculty(Expression<Func<Faculty, bool>> expression)
        {
            var faculties = await _genericRepository.Where(expression).Include(x => x.Departments).ToListAsync();
            var facultiesDTO = _mapper.Map<List<FacultyDto>>(faculties);
            return facultiesDTO;
        }
    }
}