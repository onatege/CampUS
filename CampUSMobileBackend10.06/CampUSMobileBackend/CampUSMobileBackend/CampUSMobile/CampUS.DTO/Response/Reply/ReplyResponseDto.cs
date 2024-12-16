using CampUS.DTO.Response.User;

namespace CampUS.DTO.Response.Reply
{
    public class ReplyResponseDto
    {
        public UserResponseDto User { get; set; }
        public string Content { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
