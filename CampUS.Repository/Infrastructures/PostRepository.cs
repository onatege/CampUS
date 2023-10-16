using Microsoft.EntityFrameworkCore;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Response.Post;

namespace CampUS.Repository.Infrastructures
{
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        private readonly DbSet<Post> _Post;
        public PostRepository(AppDbContext context) : base(context)
        {
            _Post = context.Set<Post>();
        }

        public async Task<List<Post>> GetPosts()
        {
            return await _context.Posts.ToListAsync();
        }

        public async Task<List<PostResponseDto>> GetUserPostsWithLikeCountAsync(int id)
        {
            var Posts = await _Post.Where(u => u.UserId == id)
                .Select(t => new PostResponseDto
                {
                    Id = t.Id,
                    Content = t.Content,
                    CreatedAt = t.CreatedAt,
                    LikeCount = t.Likes != null ? t.Likes.Count : 0
                })
                .ToListAsync();

            return Posts;
        }

        public async Task<List<PostResponseDto>> GetTagPostsWithLikeCountAsync(int id)
        {
            var tagPosts = await _Post
                .Where(t => t.Tags.Any(tag => tag.Id == id))
                .Select(t => new PostResponseDto
                {
                    Content = t.Content,
                    CreatedAt = t.CreatedAt,
                    LikeCount = t.Likes != null ? t.Likes.Count : 0
                })
                .ToListAsync();

            return tagPosts;
        }

        public async Task<Post> GetPostByIdAsync(int PostId)
        {
            var Post = await _Post
                .Include(t => t.User)
                .Include(t => t.Tags)
                .Include(t => t.Likes)
                .Include(t => t.Replies).ThenInclude(reply => reply.User)
                .FirstOrDefaultAsync(t => t.Id == PostId);

            return Post;
        }
    }
}
