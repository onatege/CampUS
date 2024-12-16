using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.Repository.Infrastructures;
using CampUS.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CampUS.DTO.Response.Club;

namespace CampUS.Repository.Infrastructures
{
    public class ClubRepository : GenericRepository<Club>, IClubRepository
    {
        private readonly DbSet<Club> _club;
        public ClubRepository(AppDbContext context) : base(context)
        {
            _club = context.Set<Club>();
        }

        public async Task<Club> GetClubWithMembersAndPostsAsync(int clubId)
        {
            return await _context.Clubs
                                 .Include(c => c.Members)
                                 .Include(c => c.ClubPosts)
                                 .FirstOrDefaultAsync(c => c.Id == clubId && !c.IsDeleted);
        }

        public async Task<List<Club>> GetClubs()
        {
            return await _context.Clubs
                             .Include(c => c.Members)
                             .Include(c => c.ClubPosts)
                             .ToListAsync();
        }

        public async Task<Club> GetClubWithMembersByIdAsync(int clubId)
        {
            return await _context.Clubs
               .Include(c => c.Members)  // Eager load the Members collection
               .FirstOrDefaultAsync(c => c.Id == clubId);
        }
    }
}
