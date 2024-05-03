using CampUS.DTO.Request.Club;
using CampUS.DTO.Response.Club;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampUS.Core.Abstracts
{
    public interface IClubPostService
    {
        Task AddClubPostAsync(AddClubPostDto addClubPostdto);
        Task<IEnumerable<ClubPostDto>> GetClubPostsAsync(int clubId);
        Task<ClubPostDto> GetClubPostByIdAsync(int postId);
    }
}
