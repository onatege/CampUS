using CampUS.DTO.Request.Club;
using CampUS.DTO.Response.Club;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampUS.Core.Abstracts
{
    public interface IClubService
    {
        Task AddClubAsync(AddClubDto addClubDto);
        Task UpdateClubAsync(int clubId, UpdateClubDto updateClubDto);
        Task DeleteClubAsync(int clubId);
        Task AddMemberAsync(int clubId, string username);
        Task RemoveMemberAsync(int clubId, int userId);
        Task<ClubProfileDto> GetClubProfileWithPostsAsync(int clubId);
    }
}
