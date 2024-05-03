using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampUS.Core.Abstracts
{
    public interface IClubRepository : IGenericRepository<Club>
    {
        Task<Club> GetClubWithMembersAsync(int clubId);
        Task RemoveByIdAsync(int clubId);
    }
}
