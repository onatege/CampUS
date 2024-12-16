using AutoMapper;
using Microsoft.EntityFrameworkCore;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Tag;
using CampUS.DTO.Response.Tag;
using CampUS.Service.Exceptions;
using CampUS.DTO.Response.Post;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using CampUS.DTO.Response;

namespace CampUS.Service.Concrete
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostRepository _postRepository;

        public TagService(ITagRepository tagRepository, IMapper mapper, IUnitOfWork unitOfWork, IPostRepository PostRepository)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _postRepository = PostRepository;
        }
        public async Task<List<TagDto>> GetAllTagsAsync()
        {
            return (await _tagRepository.GetAllTags())
               .Select(tag => _mapper.Map<TagDto>(tag))
               .ToList();
        }

        public async Task<TagDto> GetTagByIdAsync(int id)
        {
            var tag = await _tagRepository.GetTagByIdAsync(id);
            if (tag == null)
            {
                throw new NotFoundException($"TagId({id}) not found");
            }
            var tagDto = _mapper.Map<TagDto>(tag);
            tagDto.Posts = await _postRepository.GetTagPostsWithLikeCountAsync(id);
            return tagDto;
        }

        public async Task<List<TrendingTagsResponseDto>> GetTrendingTagsAsync()
        {
            var last24Hours = DateTime.UtcNow.AddDays(-1);
            var tags = await _tagRepository.GetAllTags();
            var trendingTags = tags

                .Where(tag => tag.Posts != null && tag.Posts.Count(t => t.CreatedAt >= last24Hours) >= 5)
                .Select(tag => new TrendingTagsResponseDto
                {

                    post = _mapper.Map<ICollection<PostDto>>(tag.Posts),
                    Id = tag.Id,
                    Name = tag.Name,
                    PostCount = tag.Posts?.Count(t => t.CreatedAt >= last24Hours) ?? 0
                })
                .ToList();

            return trendingTags;
        }

        public async Task AddTagAsync(AddTagDto addTagDto)
        {
            var tag = _mapper.Map<Tag>(addTagDto);
            await _tagRepository.AddAsync(tag);
            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveTagAsync(int id)
        {
            var tag = await _tagRepository.GetByIdAsync(id);
            _tagRepository.Remove(tag);
            await _unitOfWork.CommitAsync();
        }

        public async Task<CustomResponseDto> FindTag(string Keyword)
        {

            var tags = await _tagRepository.Where(x => x.Name.Contains(Keyword)).ToListAsync();
            if (tags.Count == 0)
            {
                return CustomResponseDto.Fail(new List<TagDto> { }, System.Net.HttpStatusCode.NotFound);
            }
            else
            {
                return CustomResponseDto.Success(tags, System.Net.HttpStatusCode.OK);
            }
        }
    }
}
