using Azure;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampUS.Repository.Infrastructures
{
    public class ClubPostRepository : GenericRepository<ClubPost>, IClubPostRepository
    {
        private readonly DbSet<ClubPost> _clubPost;
        public ClubPostRepository(AppDbContext context) : base(context)
        {
            _clubPost = context.Set<ClubPost>();
        }

        public async Task<IEnumerable<ClubPost>> GetClubPostsAsync(int clubId)
        {
            return await _context.ClubPosts
                                 .Where(p => p.ClubId == clubId && !p.IsDeleted)
                                 .ToListAsync();
        }

        public async Task<ClubPost> GetClubPostByIdAsync(int clubPostId)
        {
            return await _context.ClubPosts
            .Include(p => p.Club)
                         .FirstOrDefaultAsync(p => p.Id == clubPostId && !p.IsDeleted);
        }
    }
}
