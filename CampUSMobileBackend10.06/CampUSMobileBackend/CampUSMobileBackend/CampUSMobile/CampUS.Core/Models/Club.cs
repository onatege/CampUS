using CampUS.Core.Interfaces;
using System.Runtime.Serialization;

namespace CampUS.Core.Models
{
    public class Club : IBaseEntity, ICreatedAt, IUpdatedAt, IDeletable
    {
        public int Id { get; set; }
        public int ClubAdminId { get; set; } = 0;
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProfileImg { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? CreatedAt { get; set; }

        // Properly defining the collection type for ClubPosts
        public virtual ICollection<ClubPost> ClubPosts { get; set; }
        public virtual ICollection<User> Members { get; set; }
    }
}
