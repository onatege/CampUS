using CampUS.Core.Models;
using CampUS.DTO.Request.Club;
using CampUS.DTO.Response;
using CampUS.DTO.Response.Club;
using CampUS.DTO.Response.Post;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampUS.Core.Abstracts
{
    public interface IClubService
    {
        Task<List<ClubProfileDto>> GetAllClubsAsync();
        Task AddClubAsync(AddClubDto addClubDto);
        Task UpdateClubAsync(int clubId, UpdateClubDto updateClubDto);
        Task DeleteClubAsync(int clubId);
        Task AddMemberAsync(int clubId, string username);
        Task RemoveMemberAsync(int clubId, string username);
        Task<ClubProfileDto> GetClubProfileWithMembersAndPostsAsync(int clubId);

        Task<CustomResponseDto> FindClub(string Keyword);

         Task<CustomResponseDto> AssingAdmin(int clubID, int userID);
    }
}
