using Microsoft.AspNetCore.Mvc;
using System.Net;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Tag;
using CampUS.DTO.Response;

namespace CampUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;
        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTagsAsync()
        {
            var tags = await _tagService.GetAllTagsAsync();
            return Ok(CustomResponseDto.Success(tags, HttpStatusCode.OK));
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetTagByIdAsync(int id)
        {
            var tag = await _tagService.GetTagByIdAsync(id);
            return Ok(CustomResponseDto.Success(tag, HttpStatusCode.OK));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetTrendingTagsAsync()
        {
            var trendingTags = await _tagService.GetTrendingTagsAsync();
            return Ok(CustomResponseDto.Success(trendingTags, HttpStatusCode.OK));
        }

        [HttpPost]
        public async Task<IActionResult> AddTagAsync(AddTagDto addTagDto)
        {
            await _tagService.AddTagAsync(addTagDto);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> RemoveTagAsync(int id)
        {
            await _tagService.RemoveTagAsync(id);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> FindTag(string Keyword)
        {
            var results = await _tagService.FindTag(Keyword);
            return Ok(results);
        }

    }
}
