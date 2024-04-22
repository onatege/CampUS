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
using CampUS.Caching.Abstracts;
using CampUS.Caching.Keys;
using Microsoft.Extensions.Hosting;

namespace CampUS.Service.Concrete
{
    public class PostService : Service<Post>, IPostService
	{
		private readonly IPostRepository _postRepository;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
        private readonly ITagRepository _tagRepository;
        private readonly ICacheService _cacheService;

        public PostService(IGenericRepository<Post> repository, IUnitOfWork unitOfWork, IPostRepository postRepository, IMapper mapper, ITagRepository tagRepository, ICacheService cacheService) : base(repository, unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _postRepository = postRepository;
            _mapper = mapper;
            _tagRepository = tagRepository;
            _cacheService = cacheService;
        }

        public async Task AddPostAsync(AddPostDto addPostDto)
		{
			var post = _mapper.Map<Post>(addPostDto);
			await _postRepository.AddAsync(post);
			await _unitOfWork.CommitAsync();
        }

        public async Task<PostDto> GetPostByIdAsync(int postId)
        {

            if (await _postRepository.AnyAsync(p => p.Id == postId))
            {
                var post = await _postRepository.GetPostByIdAsync(postId);
                var postDto = await _postRepository.GeneratePostDto(post);

                return postDto;
            }
            else
            {
                throw new NotFoundException($"PostId({postId}) not found!");
            }
        }

        public async Task<List<PostDto>> GetAllPostAsync()
		{
			var Post = await _postRepository.GetPosts();
			var PostDto = _mapper.Map<List<PostDto>>(Post);
			return PostDto;
		}

		public async Task RemovePostAsync(int id)
		{
			var Post = await _postRepository.GetByIdAsync(id);
            if(Post == null)
            {
                throw new NotFoundException($"PostId({id}) not found.");
            }
			_postRepository.Remove(Post);
			await _unitOfWork.CommitAsync();
		}

        public async Task AddTagToPostAsync(int postId, int tagId)
        {
            var post = await _postRepository.GetPostByIdAsync(postId);
            var tag = await _tagRepository.GetTagByIdAsync(tagId);
            if (post == null || tag == null)
            {
                throw new NotFoundException($"PostId({postId}) or TagId({tagId}) not found.");
            }
            post.Tags.Add(tag);
            await _unitOfWork.CommitAsync();
        }

        public async Task LikePostAsync(int userId, int postId)
        {
            if (await _postRepository.AnyAsync(p => p.Id == postId))
            {
                var post = await _postRepository.GetPostByIdAsync(postId);
                var existingLike = post.Likes.FirstOrDefault(l => l.UserId == userId && l.PostId == postId);
                if (existingLike == null)
                {
                    var newLike = new LikePostDto
                    {
                        PostId = postId,
                        UserId = userId,
                    };
                    var createdLike = _mapper.Map<Like>(newLike);
                    post.Likes.Add(createdLike);
                }
                else
                {
                    post.Likes.Remove(existingLike);
                }
            }
            else
            {
                throw new NotFoundException($"PostId({postId}) not found.");
            }

            await _unitOfWork.CommitAsync();
        }
    }
}