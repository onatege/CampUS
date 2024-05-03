namespace CampUS.DTO.Response.Club
{
    public class ClubProfileDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProfileImg { get; set; }
        public int MemberCount { get; set; }
        public List<ClubPostDto> Posts { get; set; }
    }
}