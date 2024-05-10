namespace CampUS.DTO.Request.Post
{
    public class AddPostDto
    {
        public int UserID { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
