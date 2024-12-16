using Microsoft.EntityFrameworkCore;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Response.Post;
using CampUS.DTO.Response.User;
using CampUS.DTO.Response.Reply;
using CampUS.DTO.Response.Tag;
using System.Data.Common;
using AutoMapper;

namespace CampUS.Repository.Infrastructures
{
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        private readonly DbSet<Post> _Post;
        private readonly IMapper _mapper;

        public PostRepository(AppDbContext context, IMapper mapper) : base(context)
        {
            _Post = context.Set<Post>();
            _mapper = mapper;

        }

        public async Task<List<Post>> GetPosts()
        {
            return await _context.Posts
                             .Include(p => p.User)
                             .Include(p => p.Tags)
                             .Include(p => p.Likes)
                             .ThenInclude(p => p.User)
                             .Include(p => p.Replies).ThenInclude(reply => reply.User)
                             .ToListAsync();
        }

        public async Task<List<PostResponseDto>> GetUserPostsWithLikeCountAsync(int userId)
        {
            return await _context.Posts
               .Where(u => u.UserId == userId && !u.IsDeleted)
               .Include(p => p.Likes)  // Ensuring Likes are included
               .Select(t => new PostResponseDto
               {
                   Id = t.Id,
                   user = _mapper.Map<UserDto>(t.User),
                   Likes = _mapper.Map<ICollection<LikePostDto>>(t.Likes),
                   Images = t.Images,
                   Content = t.Content,
                   CreatedAt = t.CreatedAt,
                   LikeCount = t.Likes != null ? t.Likes.Count : 0
               })
                .ToListAsync();
        }

        public async Task<List<PostResponseDto>> GetTagPostsWithLikeCountAsync(int id)
        {
            var tagPosts = await _Post
                .Where(t => t.Tags.Any(tag => tag.Id == id))
                .Select(t => new PostResponseDto
                {
                    Id = t.Id,
                    user = _mapper.Map<UserDto>(t.User),
                    Replies = _mapper.Map<ICollection<ReplyResponseDto>>(t.Replies),
                    Likes = _mapper.Map<ICollection<LikePostDto>>(t.Likes),
                    Content = t.Content,
                    Images = t.Images,
                    CreatedAt = t.CreatedAt,
                    LikeCount = t.Likes != null ? t.Likes.Count : 0
                })
                .ToListAsync();

            return tagPosts;
        }

        public async Task<Post> GetPostByIdAsync(int postId)
        {
            var post = await _Post
              .Include(p => p.User)  // Correctly include the User navigation property
              .Include(p => p.Tags)
              .Include(p => p.Likes)
              .ThenInclude(p => p.User)// Include Likes if you want to count them or display them
              .Include(p => p.Replies).ThenInclude(reply => reply.User)  // Include Replies and their associated Users
              .FirstOrDefaultAsync(p => p.Id == postId && !p.IsDeleted);  // Ensure you are checking the IsDeleted flag if applicable

            return post;
        }

        public async Task<PostDto> GeneratePostDto(Post post)
        {
            if (post == null)
                return null;

            var postDto = new PostDto
            {
                Id = post.Id,
                Images = post.Images,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                Likes = _mapper.Map<ICollection<LikePostDto>>(post.Likes),
                LikeCount = post.Likes.Count, // Ensure likes are counted correctly here
                Tags = post.Tags?.Select(t => new TagResponseDto
                {
                    Name = t.Name
                }).ToList(),
                User = new UserResponseDto
                {
                    Id = post.User.Id,
                    UserName = post.User.UserName,
                    DisplayName = post.User.DisplayName,
                    ProfileImg = post.User.ProfileImg
                },
                Replies = post.Replies?.Select(reply => new ReplyResponseDto
                {
                    User = new UserResponseDto
                    {
                        Id = reply.User.Id,
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
        public async Task<bool> IsPostLikedByUser(int postId, int userId)
        {
            return await _context.Likes.AnyAsync(l => l.PostId == postId && l.UserId == userId);
        }
        public async Task AddLikeToPost(int postId, int userId)
        {
            var like = new Like { PostId = postId, UserId = userId };
            _context.Likes.Add(like);
        }

        public async Task RemoveLikeFromPost(int postId, int userId)
        {
            var like = await _context.Likes.FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);
            if (like != null)
            {
                _context.Likes.Remove(like);
            }
        }

        public async Task AddPostReturnId(Post post){
          var result=await   _Post.AddAsync(post);
         await _context.SaveChangesAsync();
          var id=post.Id;
         

        }
    }
}
