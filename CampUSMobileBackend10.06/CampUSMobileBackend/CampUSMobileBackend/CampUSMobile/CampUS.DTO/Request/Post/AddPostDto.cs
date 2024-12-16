namespace CampUS.DTO.Request.Post
{
    public class AddPostDto
    {
        public int UserId { get; set; }
        public string[]? Images { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
