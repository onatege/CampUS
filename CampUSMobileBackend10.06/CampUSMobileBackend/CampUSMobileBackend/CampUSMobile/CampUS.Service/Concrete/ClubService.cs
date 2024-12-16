using AutoMapper;
using CampUS.Caching.Abstracts;
using CampUS.Caching.Keys;
using CampUS.Core.Abstracts;
using CampUS.Core.Interfaces;
using CampUS.Core.Models;
using CampUS.DTO.Request.Club;
using CampUS.DTO.Response;
using CampUS.DTO.Response.Club;
using CampUS.DTO.Response.Post;
using CampUS.Repository.Infrastructures;
using CampUS.Service.Exceptions;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;

namespace CampUS.Service.Concrete
{
    public class ClubService : IClubService
    {
        private readonly IClubRepository _clubRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICacheService _cacheService;

        public ClubService(IClubRepository clubRepository, IUserRepository userRepository, IMapper mapper, IUnitOfWork unitOfWork, ICacheService cacheService)
        {
            _clubRepository = clubRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _cacheService = cacheService;
        }

        public async Task AddClubAsync(AddClubDto addClubDto)
        {
            if (await _clubRepository.AnyAsync(c => c.Name == addClubDto.Name))
            {
                throw new BadRequestException($"Club with name ({addClubDto.Name}) already exists.");
            }

            var club = _mapper.Map<Club>(addClubDto);
            await _clubRepository.AddAsync(club);
            await _unitOfWork.CommitAsync();
            string cacheKey = string.Format(ConstantCacheKeys.ClubKey, club.Id);
            await _cacheService.SetAsync(cacheKey, club, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(2));
        }

        public async Task UpdateClubAsync(int clubId,UpdateClubDto updateClubDto)
        {


            //var club = await _clubRepository.GetByIdAsync(updateClubDto.Id);
            //updateClubDto.Id = clubId;
            //if (updateClubDto.ClubAdminId == 0)
            //{
            //    updateClubDto.ClubAdminId = club.ClubAdminId;
            //}

            if (!await _clubRepository.AnyAsync(c => c.Id == clubId))
            {
                throw new NotFoundException("Club not found.");
            }
            var club = await _clubRepository.GetByIdAsync(clubId);
            var entity = _mapper.Map(updateClubDto,club);
           _clubRepository.UpdateAsync(entity);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteClubAsync(int clubId)
        {
            if (!await _clubRepository.AnyAsync(c => c.Id == clubId))
            {
                throw new NotFoundException("Club not found.");
            }

            var club = await _clubRepository.GetByIdAsync(clubId);
            _clubRepository.Remove(club);
            await _unitOfWork.CommitAsync();
        }

        public async Task AddMemberAsync(int clubId, string username)
        {
            if (!(await _clubRepository.AnyAsync(c => c.Id == clubId) && await _userRepository.AnyAsync(u => u.UserName == username)))
                throw new NotFoundException("Club or user not found.");

            var club = await _clubRepository.GetClubWithMembersByIdAsync(clubId);
            var user = await _userRepository.Where(u => u.UserName == username).SingleOrDefaultAsync();

            if (club.Members.Any(m => m.Id == user.Id))
                throw new InvalidOperationException("User already a member of this club.");

            club.Members.Add(user);
            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveMemberAsync(int clubId, string username)
        {
            if (!(await _clubRepository.AnyAsync(c => c.Id == clubId) && await _userRepository.AnyAsync(u => u.UserName == username)))
                throw new NotFoundException("Club or user not found.");

            var club = await _clubRepository.GetClubWithMembersByIdAsync(clubId);
            var user = await _userRepository.Where(u => u.UserName == username).SingleOrDefaultAsync();

            if (!club.Members.Any(m => m.Id == user.Id))
                throw new InvalidOperationException("User is not a member of this club.");

            club.Members.Remove(user);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<ClubProfileDto>> GetAllClubsAsync()
        {
            var Club = await _clubRepository.GetClubs();
            var ClubDto = _mapper.Map<List<ClubProfileDto>>(Club);
            return ClubDto;
        }

        public async Task<ClubProfileDto> GetClubProfileWithMembersAndPostsAsync(int clubId)
        {
            string cacheKey = string.Format(ConstantCacheKeys.ClubKey, clubId);
            ClubProfileDto clubProfileDto = null;

            if (await _cacheService.AnyAsync(cacheKey))
            {
                clubProfileDto = await _cacheService.GetAsync<ClubProfileDto>(cacheKey);
            }

            if (!await _clubRepository.AnyAsync(c => c.Id == clubId))
                throw new NotFoundException("Club not found.");

            var club = await _clubRepository.GetClubWithMembersAndPostsAsync(clubId);
            var profileDto = _mapper.Map<ClubProfileDto>(club);
            await _cacheService.SetAsync(cacheKey, profileDto, TimeSpan.FromMinutes(30), TimeSpan.FromHours(2));
            return profileDto;
        }

        public async Task<CustomResponseDto> FindClub(string Keyword)
        {
            var clubs = await _clubRepository.Where(x => x.Name.Contains(Keyword)).ToListAsync();
            if (clubs.Count > 0)
            {
                return CustomResponseDto.Success(clubs, System.Net.HttpStatusCode.OK);
            }
            else
            {
                return CustomResponseDto.Fail(new List<Club> { }, System.Net.HttpStatusCode.NotFound);
            }
        }

        public async Task<CustomResponseDto> AssingAdmin(int clubID,int userID)
        {


            var user = await _userRepository.GetByIdAsync(userID);
           await AddMemberAsync(clubID,user.UserName);

            var club =  await  _clubRepository.GetByIdAsync(clubID);
            club.ClubAdminId = userID;
         await   _unitOfWork.CommitAsync();

            return CustomResponseDto.Success("Updated is succesfully", System.Net.HttpStatusCode.OK);

         
        }
    }

}