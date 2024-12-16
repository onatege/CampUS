using CampUS.DTO.Response.User;

namespace CampUS.DTO.Response.Department
{
    public class DepartmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FacultyId { get; set; }
        public ICollection<UserDto> Users { get; set; }

    }
}