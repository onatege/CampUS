using CampUS.DTO.Response.Club;
using CampUS.DTO.Response.Post;

namespace CampUS.DTO.Response.User
{
    public class GetUserProfileDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string? Biography { get; set; }
        public string? ProfileImg { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int FollowerCount { get; set; }
        public ICollection<UserDto> Followers { get; set; }
        public int FollowingCount { get; set; }
        public List<PostResponseDto> Posts { get; set; }
        public ICollection<ClubProfileDto> JoinedClubs { get; set; }

    }
}
