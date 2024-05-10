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
using CampUS.Repository.Infrastructures;
using CampUS.Core.Interfaces;

namespace CampUS.Service.Concrete
{
    public class PostService : Service<Post>, IPostService
	{
		private readonly IPostRepository _postRepository;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
        private readonly ITagRepository _tagRepository;
        private readonly ICacheService _cacheService;
        private readonly IUserRepository _userRepository;

        public PostService(IGenericRepository<Post> repository, IUnitOfWork unitOfWork, IUserRepository userRepository, IPostRepository postRepository, IMapper mapper, ITagRepository tagRepository, ICacheService cacheService) : base(repository, unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _postRepository = postRepository;
            _mapper = mapper;
            _tagRepository = tagRepository;
            _userRepository = userRepository;
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

        public async Task<UpdatePostDto> UpdatePostAsync(int postId, UpdatePostDto updatePostDto)
        {
            string cacheKey = string.Format(ConstantCacheKeys.PostKey, postId);
            Post post = null;

            if (await _cacheService.AnyAsync(cacheKey))
            {
                post = await _cacheService.GetAsync<Post>(cacheKey);
            }
            else if (await _postRepository.AnyAsync(p => p.Id == postId))
            {
                post = await _postRepository.GetPostByIdAsync(postId);
            }
            else
            {
                throw new NotFoundException($"PostId({postId}) not found!");
            }

            _mapper.Map(updatePostDto, post);

            _postRepository.UpdateAsync(post);
            await _unitOfWork.CommitAsync();
            await _cacheService.SetAsync(cacheKey, post, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(2));

            var updatedPostDto = _mapper.Map<UpdatePostDto>(post);

            return updatedPostDto;
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
            if (!await _postRepository.AnyAsync(p => p.Id == postId))
            {
                throw new NotFoundException($"PostId({postId}) not found.");
            }

            // Checking the existence of like within the repository method
            var isLiked = await _postRepository.IsPostLikedByUser(postId, userId);
            if (!isLiked)
            {
                await _postRepository.AddLikeToPost(postId, userId);
                await _unitOfWork.CommitAsync();
            }
        }
        public async Task RemoveLikeAsync(int userId, int postId)
        {
            if (!await _postRepository.AnyAsync(p => p.Id == postId))
            {
                throw new NotFoundException($"PostId({postId}) not found.");
            }

            // Checking and removing the like within the repository
            if (await _postRepository.IsPostLikedByUser(postId, userId))
            {
                await _postRepository.RemoveLikeFromPost(postId, userId);
                await _unitOfWork.CommitAsync();
            }
            else
            {
                throw new NotFoundException("Like not found.");
            }
        }

    }
}