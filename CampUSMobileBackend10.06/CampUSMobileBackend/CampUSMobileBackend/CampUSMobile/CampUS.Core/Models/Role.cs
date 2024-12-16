using CampUS.Core.Interfaces;

namespace CampUS.Core.Models{


    public class Role : IBaseEntity, IDeletable, ICreatedAt, IUpdatedAt
{
        public int Id { get; set; }
        public string Title{get;set;}
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public ICollection<User> Users{get;set;}
    }
}