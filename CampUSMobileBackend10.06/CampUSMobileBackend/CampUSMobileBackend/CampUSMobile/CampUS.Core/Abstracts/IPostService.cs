using CampUS.Core.Models;
using CampUS.DTO.Request.Post;
using CampUS.DTO.Response.Post;

namespace CampUS.Core.Abstracts
{
    public interface IPostService : IService<Post>
    {
        Task AddPostAsync(AddPostDto addPostDto);
        Task<PostDto> GetPostByIdAsync(int PostId);
        Task<List<PostDto>> GetAllPostAsync();
        Task<UpdatePostDto> UpdatePostAsync(int postId, UpdatePostDto updatePostDto);
        Task RemovePostAsync(int id);
        Task AddTagToPostAsync(int id, int tagId);
        Task LikePostAsync(int userId, int postId);
        Task RemoveLikeAsync(int userId, int postId);
        Task<ICollection<PostDto>> FindPost(string Keyword);
    }
}
