namespace CampUS.DTO.Response.Club
{
    public class ClubPostDto
    {
        public int ClubPostId { get; set; }
        public string Content { get; set; }
        public string ClubName { get; set; }
        public string ClubProfileImg { get; set; }
        public ClubPostAuthorDto Author { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}