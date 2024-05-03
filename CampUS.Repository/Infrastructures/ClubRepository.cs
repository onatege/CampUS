using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.Repository.Infrastructures;
using CampUS.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampUS.Repository.Infrastructures
{
    public class ClubRepository : GenericRepository<Club>, IClubRepository
    {
        public ClubRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Club> GetClubWithMembersAsync(int clubId)
        {
            return await _context.Clubs
                                 .Include(c => c.Members)
                                 .Include(c => c.ClubPosts)
                                 .FirstOrDefaultAsync(c => c.Id == clubId && !c.IsDeleted);
        }

        public async Task RemoveByIdAsync(int clubId)
        {
            var club = await _context.Clubs.FindAsync(clubId);
            if (club != null)
            {
                club.IsDeleted = true;
                club.DeletedAt = DateTime.UtcNow;
                _context.Clubs.Update(club);
                await _context.SaveChangesAsync();
            }
        }
    }

}
