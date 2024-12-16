using System.Net;
using CampUS.Core.Abstracts;
using CampUS.DTO.Request.Department;
using CampUS.DTO.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{

    private readonly IDepartmentService _departmentService;

    public DepartmentController(IDepartmentService departmentService)
    {
        _departmentService = departmentService;
    }

    [Authorize(Roles = "SuperAdmin")]
    [HttpPost]
    public async Task<IActionResult> AddDepartment(AddDepartmentDto departmentDto)
    {
        await _departmentService.AddAsync(departmentDto);
        return Ok(CustomResponseDto.Success("Club added successfully.", HttpStatusCode.Created));
    }

    [HttpGet]
    public async Task<IActionResult> GetDepartments()
    {
        return Ok(CustomResponseDto.Success(await _departmentService.GetAllAsync(), HttpStatusCode.OK));
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetDepartmentsWithUsers()
    {
        return Ok(CustomResponseDto.Success(await _departmentService.GetAllAsync(), HttpStatusCode.OK));
    }

}