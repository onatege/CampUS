using CampUS.Core.Models;

namespace CampUS.Core.Abstracts
{
    public interface ITagRepository : IGenericRepository<Tag>
    {
        Task<List<Tag>> GetAllTags();
        Task<Tag> GetTagByIdAsync(int id);
    }
}
