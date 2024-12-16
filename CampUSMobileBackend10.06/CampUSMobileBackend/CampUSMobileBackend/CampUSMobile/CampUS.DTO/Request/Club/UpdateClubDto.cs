namespace CampUS.DTO.Request.Club
{
    public class UpdateClubDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProfileImg { get; set; }
        public int ClubAdminId { get; set;}
    }
}
