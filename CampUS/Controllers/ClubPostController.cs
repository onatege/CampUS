using Microsoft.AspNetCore.Mvc;
using System.Net;
using CampUS.DTO.Request.Club;
using CampUS.DTO.Response;
using CampUS.Core.Abstracts;

namespace CampUS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubPostController : ControllerBase
    {
        private readonly IClubPostService _clubPostService;

        public ClubPostController(IClubPostService clubPostService)
        {
            _clubPostService = clubPostService;
        }

        [HttpPost]
        public async Task<IActionResult> AddClubPost([FromBody] AddClubPostDto dto)
        {
            await _clubPostService.AddClubPostAsync(dto);
            return Ok(CustomResponseDto.Success("Club post added successfully.", HttpStatusCode.Created));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetClubPosts(int clubId)
        {
            var posts = await _clubPostService.GetClubPostsAsync(clubId);
            return Ok(CustomResponseDto.Success(posts, HttpStatusCode.OK));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetClubPostById(int postId)
        {
            var post = await _clubPostService.GetClubPostByIdAsync(postId);
            return Ok(CustomResponseDto.Success(post, HttpStatusCode.OK));
        }
    }
}