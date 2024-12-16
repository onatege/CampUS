using CampUS.DTO.Response.Reply;
using CampUS.DTO.Response.User;

namespace CampUS.DTO.Response.Post
{
    public class PostResponseDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string[]? Images { get; set; }
        public ICollection<ReplyResponseDto> Replies { get; set; }
        public ICollection<LikePostDto> Likes { get; set; }   
        public UserDto user { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int LikeCount { get; set; }
    }
}
