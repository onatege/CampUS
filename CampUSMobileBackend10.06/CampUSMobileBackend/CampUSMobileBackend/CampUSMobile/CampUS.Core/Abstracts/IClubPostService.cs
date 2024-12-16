using CampUS.DTO.Request.Club;
using CampUS.DTO.Response.Club;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampUS.Core.Abstracts
{
    public interface IClubPostService
    {
        Task AddClubPostAsync(int clubId, AddClubPostDto addClubPostdto);
        Task<IEnumerable<ClubPostDto>> GetClubPostsAsync();
        Task<ClubPostDto> GetClubPostByIdAsync(int clubPostId);
        Task UpdateClubPostAsync(int postId, UpdateClubPostDto updateClubPostDto);
        Task RemoveClubPostAsync(int clubPostId);
    }
}
