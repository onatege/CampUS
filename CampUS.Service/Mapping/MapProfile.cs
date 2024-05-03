using AutoMapper;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Tag;
using CampUS.DTO.Request.Post;
using CampUS.DTO.Request.User;
using CampUS.DTO.Response.Reply;
using CampUS.DTO.Response.Tag;
using CampUS.DTO.Response.Post;
using CampUS.DTO.Response.User;
using CampUS.DTO.Response.Club;
using CampUS.DTO.Request.Club;

namespace CampUS.Service.Mapping
{
    public class MapProfile : Profile
    {
        private readonly IPostRepository _postRepository;

        public MapProfile()
        {
            // User related mappings
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<AddUserDto, User>().ReverseMap();
            CreateMap<UpdateUserDto, User>().ReverseMap();
            CreateMap<DeleteDto, User>().ReverseMap();
            CreateMap<User, GetUserProfileDto>()
                .ForMember(dest => dest.FollowerCount, opt => opt.MapFrom(src => src.Followers.Count))
                .ForMember(dest => dest.FollowingCount, opt => opt.MapFrom(src => src.Following.Count));
            CreateMap<User, UserResponseDto>().ReverseMap();

            // Post related mappings
            CreateMap<AddPostDto, Post>().ReverseMap();
            CreateMap<PostDto, Post>().ReverseMap();
            CreateMap<Post, UpdatePostDto>().ReverseMap();
            CreateMap<Post, ReplyResponseDto>().ReverseMap();
            CreateMap<Tag, TagResponseDto>().ReverseMap();
            CreateMap<Tag, TagDto>().ReverseMap();
            CreateMap<Tag, AddTagDto>().ReverseMap();
            CreateMap<Like, LikePostDto>().ReverseMap();

            // Club related mappings
            CreateMap<Club, ClubProfileDto>()
                .ForMember(dest => dest.MemberCount, opt => opt.MapFrom(src => src.Members.Count))
                .ForMember(dest => dest.Posts, opt => opt.MapFrom(src => src.ClubPosts));
            CreateMap<AddClubDto, Club>().ReverseMap();
            CreateMap<UpdateClubDto, Club>().ReverseMap();
            CreateMap<ClubPost, ClubPostDto>()
                .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
                .ForMember(dest => dest.ClubName, opt => opt.MapFrom(src => src.Club.Name))
                .ForMember(dest => dest.ClubProfileImg, opt => opt.MapFrom(src => src.Club.ProfileImg))
                .ForMember(dest => dest.LikeCount, opt => opt.MapFrom(src => src.Likes.Count))
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => new ClubPostAuthorDto
                {
                    Name = src.Club.Name,
                    ProfileImg = src.Club.ProfileImg
                }))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));
            CreateMap<ClubPost, AddClubPostDto>().ReverseMap();

            // Mapping for adding a club member
            CreateMap<AddClubMemberDto, User>(); // This might need adjustments based on actual usage
        }
    }
}
