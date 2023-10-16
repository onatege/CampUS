using Microsoft.EntityFrameworkCore;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;

namespace CampUS.Repository.Infrastructures
{
    public class TagRepository : GenericRepository<Tag>, ITagRepository
    {
        private readonly DbSet<Tag> _tag;
        public TagRepository(AppDbContext context) : base(context)
        {
            _tag = context.Set<Tag>();
        }

        public async Task<List<Tag>> GetAllTags()
        {
            return await _tag.Include(u => u.Posts).ToListAsync();
        }

        public async Task<Tag> GetTagByIdAsync(int id)
        {
            return await _tag.FindAsync(id);
            
        }
    }
}
