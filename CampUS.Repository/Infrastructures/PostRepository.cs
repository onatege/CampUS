using Microsoft.EntityFrameworkCore;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Response.Post;
using CampUS.DTO.Response.User;
using CampUS.DTO.Response.Reply;
using CampUS.DTO.Response.Tag;

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

        public async Task<PostDto> GeneratePostDto(Post post)
        {
            var postDto = new PostDto
            {
                Id = post.Id,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                LikeCount = post.Likes?.Count ?? 0,
                Tags = post.Tags?.Select(t => new TagResponseDto
                {
                    Name = t.Name
                }).ToList(),
                User = new UserResponseDto
                {
                    UserName = post.User.UserName,
                    DisplayName = post.User.DisplayName,
                    ProfileImg = post.User.ProfileImg
                },
                Replies = post.Replies?.Select(reply => new ReplyResponseDto
                {
                    User = new UserResponseDto
                    {
                        UserName = reply.User.UserName,
                        DisplayName = reply.User.DisplayName,
                        ProfileImg = reply.User.ProfileImg
                    },
                    Content = reply.Content,
                    CreatedAt = reply.CreatedAt
                }).ToList()
            };

            return postDto;
        }
    }
}
