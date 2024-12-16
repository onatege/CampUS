using CampUS.Core.Interfaces;

namespace CampUS.Core.Models
{
    public class Post : IBaseEntity, IDeletable, IUpdatedAt, ICreatedAt
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string Content { get; set; }
        public string[]? Images { get; set; }
        public User User { get; set; }
		public bool isMainPost { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
		public DateTime? UpdatedAt { get; set; }
		public DateTime? CreatedAt { get; set; }
        public virtual ICollection<Tag>? Tags { get; set; } // Many-to-Many ilişkisi için koleksiyon
		public virtual ICollection<Reply>? Replies { get; set; }
		public virtual ICollection<Like>? Likes { get; set; }
    }
}
