namespace CampUS.DTO.Response.User
{
    public class UserResponseDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string? ProfileImg { get; set; }
        public int? DepartmendtId { get; set; }

    }
}
