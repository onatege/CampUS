﻿using CampUS.DTO.Request.User;
using CampUS.DTO.Response.User;

namespace CampUS.Core.Interfaces
{
    public interface IUserService
    {
        Task AddUserAsync(AddUserDto addUserDto);
        Task<GetUserProfileDto> GetUserWithFollowersAndPostsByIdAsync(int id);
        //Task SoftDeleteUserAsync(DeleteDto deleteUserDto);
        Task<UpdateUserDto> UpdateUserAsync(int id, UpdateUserDto updateUserDto);
        Task DeactivateUserAsync(int userId);
        Task ActivateUserAsync(int userId);
        Task RemoveUserAsync(int id);
    }
}
