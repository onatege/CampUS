using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Post;
using CampUS.DTO.Response.Reply;
using CampUS.DTO.Response.Tag;
using CampUS.DTO.Response.Post;
using CampUS.DTO.Response.User;
using CampUS.Service.Exceptions;

namespace CampUS.Service.Concrete
{
    public class PostService : Service<Post>, IPostService
	{
		private readonly IPostRepository _PostRepository;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
        private readonly ITagRepository _tagRepository;

        public PostService(IGenericRepository<Post> repository, IUnitOfWork unitOfWork, IPostRepository PostRepository, IMapper mapper, ITagRepository tagRepository) : base(repository, unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _PostRepository = PostRepository;
            _mapper = mapper;
            _tagRepository = tagRepository;
        }

        public async Task AddPostAsync(AddPostDto addPostDto)
		{
			var Post = _mapper.Map<Post>(addPostDto);
			await _PostRepository.AddAsync(Post);
			await _unitOfWork.CommitAsync();
		}

        public async Task<PostDto> GetPostByIdAsync(int PostId)
        {
            var Post = await _PostRepository.GetPostByIdAsync(PostId);

            if (Post == null)
            {
                throw new NotFoundException($"PostId({PostId}) not found.");
            }

            var PostDto = new PostDto
            {
                Id = Post.Id,
                Content = Post.Content,
                CreatedAt = Post.CreatedAt,
                LikeCount = Post.Likes?.Count ?? 0,
                Tags = Post.Tags?.Select(t => new TagResponseDto
                {
                    Name = t.Name
                }).ToList(),
                User = new UserResponseDto
                {
                    UserName = Post.User.UserName,
                    DisplayName = Post.User.DisplayName,
                    ProfileImg = Post.User.ProfileImg
                },
                Replies = Post.Replies?.Select(reply => new ReplyResponseDto
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

            return PostDto;
        }


        public async Task<List<PostDto>> GetAllPostAsync()
		{
			var Post = await _PostRepository.GetPosts();
			var PostDto = _mapper.Map<List<PostDto>>(Post);
			return PostDto;
		}

		public async Task RemovePostAsync(int id)
		{
			var Post = await _PostRepository.GetByIdAsync(id);
            if(Post == null)
            {
                throw new NotFoundException($"PostId({id}) not found.");
            }
			_PostRepository.Remove(Post);
			await _unitOfWork.CommitAsync();
		}

        public async Task AddTagToPostAsync(int PostId, int tagId)
        {
            var Post = await _PostRepository.GetPostByIdAsync(PostId);
            var tag = await _tagRepository.GetTagByIdAsync(tagId);
            if (Post == null || tag == null)
            {
                throw new NotFoundException($"PostId({PostId}) or TagId({tagId}) not found.");
            }
            Post.Tags.Add(tag);
            await _unitOfWork.CommitAsync();
        }

        public async Task LikePostAsync(int userId, int PostId)
        {
            var Post = await _PostRepository.GetPostByIdAsync(PostId);
            if (Post == null)
            {
                throw new NotFoundException($"PostId({PostId}) not found.");
            }

            var existingLike = Post.Likes.FirstOrDefault(l => l.UserId == userId && l.PostId == PostId);
            if (existingLike == null)
            {
                var newLike = new LikePostDto
                {
                    PostId = PostId,
                    UserId = userId,
                };
                var createdLike = _mapper.Map<Like>(newLike);
                Post.Likes.Add(createdLike);
            }
            else
            {
                Post.Likes.Remove(existingLike);
            }
            await _unitOfWork.CommitAsync();
        }
    }
}