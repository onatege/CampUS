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
            // Include Posts to fetch related posts data
            return await _tag.Include(t => t.Posts).ThenInclude(u => u.User).ThenInclude(p => p.Likes)
                             .ToListAsync();
        }

        public async Task<Tag> GetTagByIdAsync(int id)
        {
            return await _tag.Include(t => t.Posts).ThenInclude(r => r.Replies).ThenInclude(p => p.User).ThenInclude(u => u.Likes)
                             .FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}
