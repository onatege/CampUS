using CampUS.Core.Models;
using CampUS.DTO.Request.User;
using CampUS.DTO.Response;
using CampUS.DTO.Response.User;

namespace CampUS.Core.Interfaces
{
    public interface IUserService
    {
        Task AddUserAsync(AddUserDto addUserDto);
        Task<GetUserProfileDto> GetUserWithFollowersAndPostsByIdAsync(int id);
        //Task SoftDeleteUserAsync(DeleteDto deleteUserDto);
        Task<List<User>> GetAllUsers();
        Task<UpdateUserDto> UpdateUserAsync(int id, UpdateUserDto updateUserDto);
        Task FollowUserAsync(int userId, int targetUserId);
        Task UnfollowUserAsync(int userId, int targetUserId);
        Task DeactivateUserAsync(int userId);
        Task ActivateUserAsync(int userId);
        Task RemoveUserAsync(int id);

        Task<string> Login(LoginUserDto loginUserDto);
        Task<CustomResponseDto> FindUser(string Keyword);

        Task<CustomResponseDto> VerifiyAccount(int userId, string otp);
    }
}
