namespace CampUS.DTO.Response.Club
{
    public class ClubPostDto
    {
        public int PostId { get; set; }
        public string Content { get; set; }
        public string ClubName { get; set; }
        public string ClubProfileImg { get; set; }
        public int LikeCount { get; set; }
        public ClubPostAuthorDto Author { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}