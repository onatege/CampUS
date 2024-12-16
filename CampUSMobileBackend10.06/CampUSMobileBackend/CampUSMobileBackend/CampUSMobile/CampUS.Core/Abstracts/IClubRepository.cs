using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Response.Club;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampUS.Core.Abstracts
{
    public interface IClubRepository : IGenericRepository<Club>
    {
        Task<List<Club>> GetClubs();
        Task<Club> GetClubWithMembersAndPostsAsync(int clubId);
        Task<Club> GetClubWithMembersByIdAsync(int clubId);

    }
}
