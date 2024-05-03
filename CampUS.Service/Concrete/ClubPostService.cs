using AutoMapper;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Club;
using CampUS.DTO.Response.Club;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace CampUS.Service.Concrete
{
    public class ClubPostService : IClubPostService
    {
        private readonly IClubPostRepository _clubPostRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ClubPostService(IClubPostRepository clubPostRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _clubPostRepository = clubPostRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task AddClubPostAsync(AddClubPostDto dto)
        {
            var clubPost = _mapper.Map<ClubPost>(dto);
            await _clubPostRepository.AddAsync(clubPost);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<ClubPostDto>> GetClubPostsAsync(int clubId)
        {
            var posts = await _clubPostRepository.GetClubPostsAsync(clubId);
            return _mapper.Map<IEnumerable<ClubPostDto>>(posts);
        }

        public async Task<ClubPostDto> GetClubPostByIdAsync(int postId)
        {
            var post = await _clubPostRepository.GetClubPostByIdAsync(postId);
            return _mapper.Map<ClubPostDto>(post);
        }
    }
}
