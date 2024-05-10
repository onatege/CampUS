using Microsoft.AspNetCore.Mvc;
using System.Net;
using CampUS.DTO.Request.Club;
using CampUS.DTO.Response;
using CampUS.Core.Abstracts;
using CampUS.Service.Concrete;
using CampUS.DTO.Response.Club;
using CampUS.Core.Models;

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
        public async Task<IActionResult> AddClubPost(int clubId, [FromBody] AddClubPostDto ClubPostDto)
        {
            await _clubPostService.AddClubPostAsync(clubId, ClubPostDto);
            return Ok(CustomResponseDto.Success("Club post added successfully.", HttpStatusCode.Created));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetClubPosts(int clubId)
        {
            var posts = await _clubPostService.GetClubPostsAsync(clubId);
            return Ok(CustomResponseDto.Success(posts, HttpStatusCode.OK));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetClubPostById(int clubPostId)
        {
            var post = await _clubPostService.GetClubPostByIdAsync(clubPostId);
            return Ok(CustomResponseDto.Success(post, HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateClubPost(int clubPostId, [FromBody] UpdateClubPostDto updateClubPostDto)
        {
            await _clubPostService.UpdateClubPostAsync(clubPostId, updateClubPostDto);
            return Ok(CustomResponseDto.Success("Club post updated successfully.", HttpStatusCode.OK));
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> RemoveClubPost(int clubPostId)
        {
            await _clubPostService.RemoveClubPostAsync(clubPostId);
            return Ok(CustomResponseDto.Success("Club post deleted successfully.", HttpStatusCode.OK));
        }
    }
}