using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampUS.Core.Abstracts
{
    public interface IClubPostRepository : IGenericRepository<ClubPost>
    {
        Task<IEnumerable<ClubPost>> GetClubPostsAsync();
        Task<ClubPost> GetClubPostByIdAsync(int clubPostId);
    }
}
