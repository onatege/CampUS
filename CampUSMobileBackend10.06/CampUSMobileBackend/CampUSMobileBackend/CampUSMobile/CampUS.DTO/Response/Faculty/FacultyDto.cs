using CampUS.DTO.Response.Department;

namespace CampUS.DTO.Response.Faculty
{
    public class FacultyDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<DepartmentDto> Departments { get; set; }
    }
}


