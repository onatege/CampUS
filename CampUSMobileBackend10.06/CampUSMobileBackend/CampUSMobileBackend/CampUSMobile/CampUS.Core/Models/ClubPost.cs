using CampUS.Core.Interfaces;
using CampUS.Core.Models;

public class ClubPost : IBaseEntity, IDeletable, IUpdatedAt, ICreatedAt
{
    public int Id { get; set; }
    public int ClubId { get; set; }
    public virtual Club Club { get; set; }
    public string[]? Images { get; set; }
    public string Content { get; set; }
    public bool IsDeleted { get; set; } = false;
    public DateTime? DeletedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? CreatedAt { get; set; }
}