using CampUS.Core.Models;
using CampUS.DTO.Response.Post;

namespace CampUS.Core.Abstracts
{
    public interface IPostRepository : IGenericRepository<Post>
	{
		Task<List<Post>> GetPosts();
		Task<List<PostResponseDto>> GetUserPostsWithLikeCountAsync(int id);
		Task<List<PostResponseDto>> GetTagPostsWithLikeCountAsync(int id);
		Task<Post> GetPostByIdAsync(int PostId);
        Task<PostDto> GeneratePostDto(Post post);
        Task AddLikeToPost(int postId, int userId);
        Task RemoveLikeFromPost(int postId, int userId);
        Task<bool> IsPostLikedByUser(int postId, int userId);
        Task AddPostReturnId(Post post);
    }
}
