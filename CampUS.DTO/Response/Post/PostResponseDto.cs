namespace CampUS.DTO.Response.Post
{
    public class PostResponseDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int LikeCount { get; set; }
    }
}
