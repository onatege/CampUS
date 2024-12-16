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
using CampUS.core.Abstracts;
using Microsoft.EntityFrameworkCore;
using CampUS.DTO.Response;
using Nest;

namespace CampUS.Service.Concrete
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostRepository _postRepository;
        private readonly ICacheService _cacheService;
        private readonly IMailService _mailService;
        private readonly IHashService _hashService;
        private readonly ITokenService _tokenService;

        public UserService(IUserRepository userRepository, IMapper mapper, IUnitOfWork unitOfWork, IPostRepository PostRepository, IMailService mailService, ICacheService cacheService, IHashService hashService, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _postRepository = PostRepository;
            _unitOfWork = unitOfWork;
            _cacheService = cacheService;
            _hashService = hashService;
            _tokenService = tokenService;
            _mailService = mailService;
        }

        public async Task AddUserAsync(AddUserDto addUserDto)
        {
            if (await _userRepository.AnyAsync(u => u.UserName == addUserDto.UserName || u.Email == addUserDto.Email))
            {
                throw new BadRequestException($"User with ({addUserDto.UserName}) or ({addUserDto.Email}) exists.");
            }
            var passwordHash = _hashService.HashPassword(addUserDto.Password);
            var user = _mapper.Map<User>(addUserDto);
            user.Password = passwordHash;
            await _userRepository.AddAsync(user);
            await _unitOfWork.CommitAsync();

           await this.GenerateVerifyToken(user.Id);

        }

        private async Task GenerateVerifyToken(int userId){

            var user=  _userRepository.GetUserWithRole(userId);
            user.VerifyToken=_tokenService.GenerateToken(user,24*60);
            var expire = _tokenService.GetClaims(user.VerifyToken);

            await _mailService.sendMessageAsync(user.Email, "Varification Email", expire);

            _userRepository.UpdateAsync(user);
           await _unitOfWork.CommitAsync();

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
                await this.UpdateUserCache(user.Id);

            }
            else
            {
                throw new NotFoundException($"UserId({id}) not found!");
            }
            var userProfileDto = _mapper.Map<GetUserProfileDto>(user);
            userProfileDto.Posts = await _postRepository.GetUserPostsWithLikeCountAsync(id);

            return userProfileDto;
        }

        public async Task<List<User>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return users;
        }

        public async Task<UpdateUserDto> UpdateUserAsync(int id, UpdateUserDto updateUserDto)
        {
            string cacheKey = string.Format(ConstantCacheKeys.UserKey, id);
            User user = null;

            if (await _cacheService.AnyAsync(cacheKey))
            {
                await _cacheService.RemoveAsync(cacheKey);

            }


            if (await _userRepository.AnyAsync(u => u.Id == id))
            {
                user = await _userRepository.FindUserByIdAsync(id);
            }
            else
            {
                throw new NotFoundException($"UserId({id}) not found!");
            }

            try
            {
                // Use AutoMapper to update the entity
                _mapper.Map(updateUserDto, user);

                 _userRepository.UpdateAsync(user);
                await _unitOfWork.CommitAsync();
            }
            catch (Exception e)
            {
                
                var err = e;
                throw new Exception(e.InnerException.Message);
            }
           

            var updatedUserDto = _mapper.Map<UpdateUserDto>(user);

            return updatedUserDto;
        }

        public async Task FollowUserAsync(int userId, int targetUserId)
        {
            string cacheKey = string.Format(ConstantCacheKeys.UserKey, targetUserId);
            string cacheKeyUser = string.Format(ConstantCacheKeys.UserKey, userId);


            if (await _cacheService.AnyAsync(cacheKey))
            {
               await _cacheService.RemoveAsync(cacheKey);

            }

            if (await _cacheService.AnyAsync(cacheKeyUser))
            {
                await _cacheService.RemoveAsync(cacheKeyUser);

            }
            if (!await _userRepository.AnyAsync(u => u.Id == userId) ||
                !await _userRepository.AnyAsync(u => u.Id == targetUserId))
            {
                throw new NotFoundException("One of the users not found.");
            }

            var user = await _userRepository.GetUserWithFollowersByIdAsync(userId);
            var targetUser = await _userRepository.GetUserWithFollowersByIdAsync(targetUserId);

            if (!user.Following.Any(u => u.Id == targetUserId))
            {
                user.Following.Add(targetUser);
                targetUser.Followers.Add(user);
                await _unitOfWork.CommitAsync();

            }
            else
            {
                throw new InvalidOperationException("Already following this user.");
            }
        }

        public async Task UnfollowUserAsync(int userId, int targetUserId)
        {
            string cacheKey = string.Format(ConstantCacheKeys.UserKey, targetUserId);
            string cacheKeyUser = string.Format(ConstantCacheKeys.UserKey, userId);


            if (await _cacheService.AnyAsync(cacheKey))
            {
                await _cacheService.RemoveAsync(cacheKey);

            }

            if (await _cacheService.AnyAsync(cacheKeyUser))
            {
                await _cacheService.RemoveAsync(cacheKeyUser);

            }

            if (!await _userRepository.AnyAsync(u => u.Id == userId) ||
                !await _userRepository.AnyAsync(u => u.Id == targetUserId))
            {
                throw new NotFoundException("One of the users not found.");
            }

            var user = await _userRepository.GetUserWithFollowersByIdAsync(userId);
            var targetUser = await _userRepository.GetUserWithFollowersByIdAsync(targetUserId);

            if (user.Following.Any(u => u.Id == targetUserId))
            {
                var followingUser = user.Following.First(u => u.Id == targetUserId);
                user.Following.Remove(followingUser);

                var followerUser = targetUser.Followers.First(u => u.Id == userId);
                targetUser.Followers.Remove(followerUser);

                await _unitOfWork.CommitAsync();
                await this.UpdateUserCache(user.Id);
                await this.UpdateUserCache(targetUser.Id);

            }
            else
            {
                throw new InvalidOperationException("Not following this user.");
            }
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
            if (await _userRepository.AnyAsync(u => u.Id == id))
            {
                _userRepository.Remove(user);
                await _unitOfWork.CommitAsync();
            }
        }
        public async Task<string> Login(LoginUserDto loginUserDto)
        {
            if (loginUserDto.Email == null)
            {
                throw new BadRequestException("Email cannot be null");
            }

            var user = _userRepository.Where(x => x.Email == loginUserDto.Email).IgnoreQueryFilters().FirstOrDefault();
            if (user != null)
            {
                if (!user.IsActive && user.VerifyToken is not null)
                {
                 throw new Exception($"Profilinizi Aktif Etmelisiniz userid:{user.Id}");

                }
                if (!user.IsActive)
                {

                    await ActivateUserAsync(user.Id);

                }
                var userWithRole = _userRepository.GetUserWithRole(user.Id);
                var verify = _hashService.VerifyPassword(loginUserDto.Password, user.Password);
                if (verify)
                {
                    var token = _tokenService.GenerateToken(user,30);
                    await _mailService.sendMessageAsync(user.Email, "Varification Email", "Email confirmed");

                    return token;
                }
                else
                {
                    throw new BadRequestException("Email or password is wrong");
                }
            }
            else
            {
                throw new NotFoundException("User doesn't exist");
            }
        }
        public async Task<CustomResponseDto> FindUser(string Keyword)
        {

            var users = await _userRepository.Where(x => x.UserName.Contains(Keyword)).ToListAsync();

            if (users.Count == 0)
            {
                return CustomResponseDto.Fail("User not found !", System.Net.HttpStatusCode.NotFound);
            }
            else
            {
                return CustomResponseDto.Success(_mapper.Map<List<UserDto>>(users), System.Net.HttpStatusCode.OK);

            }


        }

        public async Task<CustomResponseDto> VerifiyAccount(int userId,string otp) {

            var user =  _userRepository.GetUserWithRole(userId);

             var expire= _tokenService.GetClaims(user.VerifyToken);

            if (expire == otp)
            {
                var tokenDate = DateTimeOffset.FromUnixTimeSeconds(Convert.ToInt64(expire)).UtcDateTime;
                TimeSpan difference = DateTime.Now - tokenDate;
                if (difference.Hours < 24)
                {
                    user.IsActive = true;
                    user.VerifyToken = null;
                    _userRepository.UpdateAsync(user);
                    _unitOfWork.Commit();
                    return CustomResponseDto.Success("İşlem Başarılı", System.Net.HttpStatusCode.OK);
                }
                else
                {
                    await GenerateVerifyToken(userId);

                    return CustomResponseDto.Fail("OTP zaman aşımına uğradı .Yeni OTP mail hesabınıza gönderildi", System.Net.HttpStatusCode.NotFound);
                }
            }
            else
            {
                return CustomResponseDto.Fail("İşlem Başarılı Deil", System.Net.HttpStatusCode.BadRequest);
            }

        }

        private async Task UpdateUserCache(int userId)
        {

            var user = await _userRepository.GetUserWithFollowersByIdAsync(userId);
            var userProfileDto = _mapper.Map<GetUserProfileDto>(user);
            userProfileDto.Posts = await _postRepository.GetUserPostsWithLikeCountAsync(user.Id);
            await _cacheService.SetAsync(string.Format(ConstantCacheKeys.UserKey, userId), user, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(2));
        }

    }


}
