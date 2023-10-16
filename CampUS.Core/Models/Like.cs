namespace CampUS.Core.Models
{
    public class Like 
	{
		public int PostId { get; set; }
		public int UserId { get; set; }
		public User User { get; set; }
		public Post Post { get; set; }

	}
}
