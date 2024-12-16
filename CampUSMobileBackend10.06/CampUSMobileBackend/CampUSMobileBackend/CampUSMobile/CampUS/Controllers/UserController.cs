using Microsoft.AspNetCore.Mvc;
using System.Net;
using CampUS.Core.Interfaces;
using CampUS.Core.Models;
using CampUS.DTO.Request.User;
using CampUS.DTO.Response;
using CampUS.Service.Filters;

namespace CampUS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> AddUserAsync(AddUserDto addUserDto)
        {
            await _userService.AddUserAsync(addUserDto);
            return Ok(CustomResponseDto.Success(addUserDto, HttpStatusCode.OK));
        }

        [ServiceFilter(typeof(NotFoundFilter<User>))]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetUserWithFollowersAndPostsByIdAsync(int id)
        {
            var user = await _userService.GetUserWithFollowersAndPostsByIdAsync(id);
            return Ok(CustomResponseDto.Success(user, HttpStatusCode.OK));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(CustomResponseDto.Success(users, HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateUserAsync(int id, UpdateUserDto updateUserDto)
        {
            await _userService.UpdateUserAsync(id, updateUserDto);
            return Ok(CustomResponseDto.Success(updateUserDto, HttpStatusCode.OK));
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> FollowUser(int userId, int targetUserId)
        {
            await _userService.FollowUserAsync(userId, targetUserId);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UnfollowUser(int userId, int targetUserId)
        {
            await _userService.UnfollowUserAsync(userId, targetUserId);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> DeactivateUserAsync(int id)
        {
            await _userService.DeactivateUserAsync(id);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> ActivateUserAsync(int id)
        {
            await _userService.ActivateUserAsync(id);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> RemoveUserAsync(int id)
        {
            await _userService.RemoveUserAsync(id);
            return Ok(CustomResponseDto.Success(null, HttpStatusCode.OK));
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUserDto)
        {
            var result = await _userService.Login(loginUserDto);
            return Ok(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> FindUser(string Keyword)
        {
            var result = await _userService.FindUser(Keyword);
            if (result.StatusCode == HttpStatusCode.OK)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> VerifyAccount(int userID
            ,
            string Otp) {
        
            var result=   await  _userService.VerifiyAccount(userID, Otp);

         if(result.StatusCode == HttpStatusCode.OK) { return Ok(result); }
         else { return NotFound(result); }
        
        
        }
    }

}
