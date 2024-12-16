using CampUS.Core.Interfaces;

namespace CampUS.Core.Models
{
    public class Tag : IBaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Post>? Posts { get; set; }  // Many-to-Many ilişkisi için koleksiyon
    }
}
