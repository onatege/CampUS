namespace CampUS.Core.Models
{
    public class PostReply
    {
        public int PostId { get; set; }
        public int ReplyId { get; set; }
        public Post Post { get; set; }
        public Reply Reply { get; set; }
    }
}
