using AutoMapper;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Club;
using CampUS.DTO.Response.Club;
using CampUS.Service.Exceptions;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace CampUS.Service.Concrete
{
    public class ClubPostService : IClubPostService
    {
        private readonly IClubPostRepository _clubPostRepository;
        private readonly IClubRepository _clubRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ClubPostService(IClubPostRepository clubPostRepository, IClubRepository clubRepository,  IMapper mapper, IUnitOfWork unitOfWork)
        {
            _clubPostRepository = clubPostRepository;
            _clubRepository = clubRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }



        public async Task AddClubPostAsync(int clubId, AddClubPostDto ClubPostDto)
        {
            var clubPost = _mapper.Map<ClubPost>(ClubPostDto);
            clubPost.ClubId = clubId;  // Set the club ID explicitly
            await _clubPostRepository.AddAsync(clubPost);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<ClubPostDto>> GetClubPostsAsync()
        {
                var posts = await _clubPostRepository.GetClubPostsAsync();
                return _mapper.Map<IEnumerable<ClubPostDto>>(posts);
        }

        public async Task<ClubPostDto> GetClubPostByIdAsync(int clubPostId)
        {
            if (!await _clubPostRepository.AnyAsync(p => p.Id == clubPostId))
            {
                throw new NotFoundException("Post not found.");
            }

            var post = await _clubPostRepository.GetClubPostByIdAsync(clubPostId);
            return _mapper.Map<ClubPostDto>(post);
        }

        public async Task UpdateClubPostAsync(int postId, UpdateClubPostDto updateClubPostDto)
        {
            if (!await _clubPostRepository.AnyAsync(p => p.Id == postId))
            {
                throw new NotFoundException($"ClubPost with ID ({postId}) not found.");
            }

            var clubPost = await _clubPostRepository.GetByIdAsync(postId);
            _mapper.Map(updateClubPostDto, clubPost);
            _clubPostRepository.UpdateAsync(clubPost);
            await _unitOfWork.CommitAsync();
        }
        public async Task RemoveClubPostAsync(int clubPostId)
        {
            if (!await _clubPostRepository.AnyAsync(p => p.Id == clubPostId))
            {
                throw new NotFoundException($"ClubPost with ID ({clubPostId}) not found.");
            }

            var post = await _clubPostRepository.GetByIdAsync(clubPostId);
            _clubPostRepository.Remove(post);
            await _unitOfWork.CommitAsync();
        }
    }
}
