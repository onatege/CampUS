using Microsoft.AspNetCore.Mvc;
using System.Net;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Post;
using CampUS.DTO.Response;
using CampUS.Service.Filters;
using CampUS.DTO.Response.Reply;
using CampUS.DTO.Request.Reply;

namespace CampUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IReplyService _replyService;

        public PostController(IPostService postService, IReplyService replyService)
        {
            _replyService = replyService;
            _postService = postService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPostAsync()
        {
            var Posts = await _postService.GetAllPostAsync();
            return Ok(CustomResponseDto.Success(Posts, HttpStatusCode.OK));
        }

        [HttpPost]
        public async Task<IActionResult> AddPostAsync(AddPostDto addPostDto)
        {
            await _postService.AddPostAsync(addPostDto);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddReplyAsync(AddReplyDto addReplyDto)
        {
            await _replyService.AddReplyAsync(addReplyDto);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }


        [ServiceFilter(typeof(NotFoundFilter<Post>))]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetPostByIdAsync(int id)
        {
            var Post = await _postService.GetPostByIdAsync(id);
            return Ok(CustomResponseDto.Success(Post, HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdatePost(int postId, [FromBody] UpdatePostDto updatePostDto)
        {
            var updatedPost = await _postService.UpdatePostAsync(postId, updatePostDto);
            return Ok(CustomResponseDto.Success(updatedPost, HttpStatusCode.OK));
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> RemovePostAsync(int id)
        {
            await _postService.RemovePostAsync(id);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> AddTagToPostAsync(int postId, int tagId)
        {
            await _postService.AddTagToPostAsync(postId, tagId);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> LikePostAsync(int userId, int postId)
        {
            await _postService.LikePostAsync(userId, postId);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> RemoveLikeAsync(int userId, int postId)
        {
            await _postService.RemoveLikeAsync(userId, postId);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> FindPost(String keyword)
        {
            return Ok(await _postService.FindPost(keyword));
        }

    }
}
