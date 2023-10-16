using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using CampUS.Caching.Abstracts;
using CampUS.Caching.Keys;
using CampUS.Core.Abstracts;
using CampUS.Core.Interfaces;
using CampUS.Core.Models;
using CampUS.DTO.Request.User;
using CampUS.DTO.Response.User;
using CampUS.Service.Exceptions;

namespace CampUS.Service.Concrete
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostRepository _PostRepository;
        private readonly ICacheService _cacheService;

        public UserService(IUserRepository userRepository, IMapper mapper, IUnitOfWork unitOfWork, IPostRepository PostRepository, ICacheService cacheService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _PostRepository = PostRepository;
            _unitOfWork = unitOfWork;
            _cacheService = cacheService;
        }

        public async Task AddUserAsync(AddUserDto addUserDto)
        {
            if (await _userRepository.AnyAsync(u => u.UserName == addUserDto.UserName || u.Email == addUserDto.Email))
            {
                throw new BadRequestException($"User with ({addUserDto.UserName}) or ({addUserDto.Email}) exists.");
            }
            var user = _mapper.Map<User>(addUserDto);
            await _userRepository.AddAsync(user);
            await _unitOfWork.CommitAsync();
            string cacheKey = string.Format(ConstantCacheKeys.UserKey, user.Id);
            await _cacheService.SetAsync(cacheKey, user, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(2));
        }

        public async Task<GetUserProfileDto> GetUserWithFollowersAndPostsByIdAsync(int id)
        {
            string cacheKey = string.Format(ConstantCacheKeys.UserKey, id);
            User user = null;

            if (await _cacheService.AnyAsync(cacheKey))
            {
                user = await _cacheService.GetAsync<User>(cacheKey);
            }
            else if (await _userRepository.AnyAsync(u => u.Id == id))
            {
                user = await _userRepository.GetUserWithFollowersByIdAsync(id);
                await _cacheService.SetAsync(cacheKey, user, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(2));
            }
            else
            {
                throw new NotFoundException($"UserId({id}) not found!");
            }
            var userProfileDto = _mapper.Map<GetUserProfileDto>(user);
            userProfileDto.Posts = await _PostRepository.GetUserPostsWithLikeCountAsync(id);

            return userProfileDto;
        }


        public async Task<UpdateUserDto> UpdateUserAsync(int id, UpdateUserDto updateUserDto)
        {
            string cacheKey = string.Format(ConstantCacheKeys.UserKey, id);
            User user = null;

            if (await _cacheService.AnyAsync(cacheKey))
            {
                user = await _cacheService.GetAsync<User>(cacheKey);
            }
            else if (await _userRepository.AnyAsync(u => u.Id == id))
            {
                user = await _userRepository.FindUserByIdAsync(id);
            }
            else
            {
                throw new NotFoundException($"UserId({id}) not found!");
            }

            // Use AutoMapper to update the entity
            _mapper.Map(updateUserDto, user);

            _userRepository.UpdateAsync(user);
            await _unitOfWork.CommitAsync();
            await _cacheService.SetAsync(cacheKey, user, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(2));

            var updatedUserDto = _mapper.Map<UpdateUserDto>(user);

            return updatedUserDto;
        }

        public async Task DeactivateUserAsync(int userId)
        {
            var cacheKey = string.Format(ConstantCacheKeys.UserKey, userId);
            User? user = null;

            if (await _cacheService.AnyAsync(cacheKey))
            {
                user = await _cacheService.GetAsync<User>(cacheKey);
                await _cacheService.RemoveAsync(cacheKey);
            }
            else if (await _userRepository.AnyAsync(u => u.Id == userId))
            {
                user = await _userRepository.GetUserForActivationAsync(userId);
            }
            else
            {
                throw new NotFoundException($"UserId({userId}) not found!");
            }

            user.IsActive = false; // IsActive değerini burada güncelliyoruz
            _userRepository.UpdateAsync(user);
            await _unitOfWork.CommitAsync();
        }

        public async Task ActivateUserAsync(int userId)
        {
            var cacheKey = string.Format(ConstantCacheKeys.UserKey, userId);
            User? user = null;

            if (await _userRepository.AnyDeactiveUserAsync(u => u.Id == userId))
            {
                user = await _userRepository.GetUserForActivationAsync(userId);
                user.IsActive = true; // IsActive değerini burada güncelliyoruz
                _userRepository.UpdateAsync(user);
                await _cacheService.SetAsync(cacheKey, user, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(2));
                await _unitOfWork.CommitAsync();
            }
            else
            {
                throw new NotFoundException($"UserId({userId}) not found!");
            }
        }

        public async Task RemoveUserAsync(int id)
        {
            var cacheKey = string.Format(ConstantCacheKeys.UserKey, id);
            User? user = null;

            if (await _cacheService.AnyAsync(cacheKey))
            {
                user = await _cacheService.GetAsync<User>(cacheKey);
                await _cacheService.RemoveAsync(cacheKey);
            }
            else if (await _userRepository.AnyAsync(u => u.Id == id))
            {
                user = await _userRepository.GetByIdAsync(id);
            }
            else
            {
                throw new NotFoundException($"UserId({id}) not found!");
            }
            if (user != null)
            {
                _userRepository.Remove(user);
                await _unitOfWork.CommitAsync();
            }
        }
    }
}
