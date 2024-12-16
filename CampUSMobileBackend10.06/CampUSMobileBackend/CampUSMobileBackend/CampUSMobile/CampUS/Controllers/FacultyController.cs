using System.Net;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Faculty;
using CampUS.DTO.Response;
using CampUS.DTO.Response.Faculty;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;


namespace CampUS.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FacultyController : ControllerBase
    {
        private readonly IFacultyService _facultyService;

        public FacultyController(IFacultyService facultyService)
        {
            _facultyService = facultyService;
        }

        [HttpPost]
        public async Task<IActionResult> AddFaculty(AddFacultyDto addFacultyDto)
        {
            await _facultyService.AddAsync(addFacultyDto);
            return Ok(CustomResponseDto.Success("Club added successfully.", HttpStatusCode.Created));
        }

        [HttpGet]
        public async Task<IEnumerable<FacultyDto>> GetAllClubs()
        {
            return await _facultyService.GetAllAsync();
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<FacultyDto>> GetAllDepartmentsWithFaculty()
        {

            var result = await _facultyService.GetAllDepartmentsWithFaculty(x => x.Id != 0);
            return result;
        }


    }
}