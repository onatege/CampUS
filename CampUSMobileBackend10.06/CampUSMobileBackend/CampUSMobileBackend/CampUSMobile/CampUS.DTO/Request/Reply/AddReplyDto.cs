using CampUS.DTO.Response.User;

namespace CampUS.DTO.Request.Reply
{
    public class AddReplyDto
    {
        public int UserId { get; set; }
        public int postId { get; set; }

        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
