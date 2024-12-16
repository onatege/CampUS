using Microsoft.AspNetCore.Mvc;
using System.Net;
using CampUS.Core.Interfaces;
using CampUS.DTO.Request.Club;
using CampUS.DTO.Response;
using CampUS.Service.Filters;
using CampUS.Core.Abstracts;
using CampUS.Caching.Abstracts;
using StackExchange.Redis;
using CampUS.Caching.Keys;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace CampUS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubController : ControllerBase
    {
        private readonly IClubService _clubService;
        private readonly ICacheService _cacheService;

        public ClubController(IClubService clubService, ICacheService cacheService)
        {
            _clubService = clubService;
            _cacheService = cacheService;
        }

        [Authorize(Roles = "SuperAdmin")]
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

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllClubsAsync()
        {
            var clubProfile = await _clubService.GetAllClubsAsync();
            return Ok(CustomResponseDto.Success(clubProfile, HttpStatusCode.OK));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> StoreRedis(string value)
        {
            await _cacheService.SetAsync(string.Format(ConstantCacheKeys.ClubKey, 123321), value + "Ahmet", TimeSpan.FromHours(+1), TimeSpan.FromDays(+1));
            var resultBYTE = await _cacheService.GetAsync(string.Format(ConstantCacheKeys.ClubKey, 123321));

            var text = Encoding.UTF8.GetString(resultBYTE, 0, resultBYTE.Length);

            return Ok(CustomResponseDto.Success($"{text}-{value}---{string.Format(ConstantCacheKeys.ClubKey, 123321)}", HttpStatusCode.OK));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AssignClubAdmin(int clubId,
            int userId)
        {
           await  _clubService.AssingAdmin(clubId,userId );
            return Ok();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> FindClub(string Keyword)
        {

            return Ok(await _clubService.FindClub(Keyword));
        }
    }
}
