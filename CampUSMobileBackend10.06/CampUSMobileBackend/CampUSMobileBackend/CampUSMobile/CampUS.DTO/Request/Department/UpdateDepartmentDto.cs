using CampUS.DTO.Response.User;

namespace CampUS.DTO.Request.Department
{

    public class UpdateDepartmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FacultyId { get; set; }

    }


}