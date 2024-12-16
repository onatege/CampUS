using CampUS.DTO.Response.User;

namespace CampUS.DTO.Response.Club
{
    public class ClubProfileDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProfileImg { get; set; }
        public int MemberCount { get; set; }
        public List<UserDto> Members { get; set; }
        public int ClubAdminId { get; set; }
        public List<ClubPostDto> ClubPosts { get; set; }
    }
}