using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using CampUS.Core.Interfaces;

namespace CampUS.Core.Models
{
    public class User : IBaseEntity, ICreatedAt, IUpdatedAt, IDeletable
    { 
        public int Id { get; set; }
		public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Biography { get; set; }
        public string? ProfileImg { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsActive { get; set; } = false;
        public int RoleId{get;set;}=3;
        public Role Role{get;set;}
        public int? DepartmentId { get; set; } = 5;
        public Department? Department { get; set; }
        public DateTime? DeletedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? CreatedAt { get; set; }
        public virtual ICollection<Post>? Posts { get; set;}
        public virtual ICollection<Like>? Likes { get; set; }
        public virtual ICollection<User>? Followers { get; set; }
        public virtual ICollection<User>? Following { get; set; }
        public virtual ICollection<Club> JoinedClubs { get; set; }
        public string? VerifyToken{get;set;}
    }
}
