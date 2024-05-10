using Microsoft.AspNetCore.Mvc;
using System.Net;
using CampUS.Core.Interfaces;
using CampUS.DTO.Request.Club;
using CampUS.DTO.Response;
using CampUS.Service.Filters;
using CampUS.Core.Abstracts;

namespace CampUS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubController : ControllerBase
    {
        private readonly IClubService _clubService;

        public ClubController(IClubService clubService)
        {
            _clubService = clubService;
        }

        [HttpPost]
        public async Task<IActionResult> AddClub([FromBody] AddClubDto addClubDto)
        {
            await _clubService.AddClubAsync(addClubDto);
            return Ok(CustomResponseDto.Success("Club added successfully.", HttpStatusCode.Created));
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteClub(int id)
        {
            await _clubService.DeleteClubAsync(id);
            return Ok(CustomResponseDto.Success("Club deleted successfully.", HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateClub(int id, [FromBody] UpdateClubDto updateClubDto)
        {
            await _clubService.UpdateClubAsync(id, updateClubDto);
            return Ok(CustomResponseDto.Success("Club updated successfully.", HttpStatusCode.OK));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddMember(int clubId, [FromBody] AddClubMemberDto addMemberDto)
        {
            await _clubService.AddMemberAsync(clubId, addMemberDto.Username);
            return Ok(CustomResponseDto.Success("Member added successfully.", HttpStatusCode.OK));
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> RemoveMember(int clubId, [FromBody] AddClubMemberDto addMemberDto)
        {
            await _clubService.RemoveMemberAsync(clubId, addMemberDto.Username);
            return Ok(CustomResponseDto.Success("Member removed successfully.", HttpStatusCode.OK));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetClubProfileWithPosts(int id)
        {
            var clubProfile = await _clubService.GetClubProfileWithMembersAndPostsAsync(id);
            return Ok(CustomResponseDto.Success(clubProfile, HttpStatusCode.OK));
        }
    }
}
