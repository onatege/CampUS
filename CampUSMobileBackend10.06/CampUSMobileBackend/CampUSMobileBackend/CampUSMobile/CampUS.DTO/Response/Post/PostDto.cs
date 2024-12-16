using CampUS.DTO.Response.Reply;
using CampUS.DTO.Response.Tag;
using CampUS.DTO.Response.User;

namespace CampUS.DTO.Response.Post
{
    public class PostDto
    {
        public int Id { get; set; }
        //public int UserId { get; set; }
        public UserResponseDto User { get; set; }
        public string? Content { get; set; }
        public string[]? Images { get; set; }


        public DateTime? CreatedAt { get; set; }
        public ICollection<LikePostDto> Likes { get; set; }
        public int LikeCount { get; set; }
        public List<TagResponseDto>? Tags { get; set; }
        public List<ReplyResponseDto> Replies { get; set; }
    }
}
