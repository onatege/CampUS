using System.Collections.Immutable;
using CampUS.Core.Models;

namespace CampUS.Core.Abstracts
{

    public interface IElasticRepository
    {

        Task<Post> SaveAsync(Post entity);
        Task<ImmutableList<Post>> GetAllAsync();
        Task<Post?> GetByIdAsync(string id);
        Task<ImmutableList<Post>> SearchByKeywordAsync(string keyword);
    }
}