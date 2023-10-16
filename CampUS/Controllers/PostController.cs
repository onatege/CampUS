using Microsoft.AspNetCore.Mvc;
using System.Net;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Post;
using CampUS.DTO.Response;
using CampUS.Service.Filters;

namespace CampUS.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class PostController : ControllerBase
	{
		private readonly IPostService _PostService;
		public PostController(IPostService PostService)
		{

			_PostService = PostService;
		}
		[HttpGet]
		public async Task<IActionResult> GetAllPostAsync()
        {
			var Posts = await _PostService.GetAllPostAsync();
            return Ok(CustomResponseDto.Success(Posts, HttpStatusCode.OK));
        }

		[HttpPost]
		public async Task<IActionResult> AddPostAsync(AddPostDto addPostDto)
		{
			await _PostService.AddPostAsync(addPostDto);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }
		[ServiceFilter(typeof(NotFoundFilter<Post>))]
		[HttpGet("[action]")]
		public async Task<IActionResult> GetPostByIdAsync(int id)
		{
			var Post = await _PostService.GetPostByIdAsync(id);
            return Ok(CustomResponseDto.Success(Post, HttpStatusCode.OK));
        }

		[HttpDelete("[action]")]
		public async Task<IActionResult> RemovePostAsync(int id)
		{
			await _PostService.RemovePostAsync(id);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

		[HttpPut("[action]")]
		public async Task<IActionResult> AddTagToPostAsync(int PostId, int tagId)
		{
			await _PostService.AddTagToPostAsync(PostId, tagId);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

		[HttpPut("[action]")]
		public async Task<IActionResult> LikePostAsync(int userId, int PostId)
		{
			await _PostService.LikePostAsync(userId, PostId);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

	}
}
