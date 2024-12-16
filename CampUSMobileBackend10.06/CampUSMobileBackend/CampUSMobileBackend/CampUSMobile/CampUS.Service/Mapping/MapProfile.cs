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
using CampUS.DTO.Request.Reply;
using CampUS.DTO.Response.Faculty;
using CampUS.DTO.Request.Faculty;
using CampUS.DTO.Request.Department;
using CampUS.DTO.Response.Department;

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
            CreateMap<User, UserResponseDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.DisplayName))
                .ForMember(dest => dest.ProfileImg, opt => opt.MapFrom(src => src.ProfileImg))
                .ForMember(dest => dest.DepartmendtId, opt => opt.MapFrom(src => src.DepartmentId));


            // Post related mappings
            CreateMap<Post, PostResponseDto>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
              .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images))
               .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
               .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
               .ForMember(dest => dest.LikeCount, opt => opt.MapFrom(src => src.Likes.Count)).ReverseMap();
            CreateMap<AddPostDto, Post>().ReverseMap();
            CreateMap<Reply, AddReplyDto>().ReverseMap();
            CreateMap<Post, PostDto>()
              .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))  // Map the User
              .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images))
              .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
              .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
              .ForMember(dest => dest.LikeCount, opt => opt.MapFrom(src => src.Likes.Count))
              .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags))  // Ensure Tags are mapped if they are collections
              .ForMember(dest => dest.Replies, opt => opt.MapFrom(src => src.Replies.Select(r => new ReplyResponseDto
              {
                  User = new UserResponseDto
                  {
                      Id = r.User.Id,
                      UserName = r.User.UserName,
                      DisplayName = r.User.DisplayName,
                      ProfileImg = r.User.ProfileImg,
                      DepartmendtId = r.User.DepartmentId
                  },
                  Content = r.Content,
                  CreatedAt = r.CreatedAt
              }).ToList()));  // Correctly map Replies including User details
            CreateMap<UpdatePostDto, Post>()
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content)).ReverseMap();
            CreateMap<Post, UpdatePostDto>().ReverseMap();
            CreateMap<Tag, TagResponseDto>().ReverseMap();
            CreateMap<Tag, TagDto>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
               .ForMember(dest => dest.Posts, opt => opt.MapFrom(src => src.Posts)).ReverseMap();
            CreateMap<Tag, AddTagDto>().ReverseMap();
            CreateMap<Like, LikePostDto>().ReverseMap();

            // Club related mappings
            CreateMap<Club, ClubProfileDto>()
                .ForMember(dest => dest.MemberCount, opt => opt.MapFrom(src => src.Members.Count))
                .ForMember(dest => dest.ClubPosts, opt => opt.MapFrom(src => src.ClubPosts)).ReverseMap();
            CreateMap<AddClubDto, Club>().ReverseMap();
            CreateMap<UpdateClubDto, Club>().ReverseMap();
            CreateMap<ClubPost, ClubPostDto>()
                .ForMember(dest => dest.ClubPostId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
                .ForMember(dest => dest.Members, opt => opt.MapFrom(src => src.Club.Members))
                .ForMember(dest => dest.ClubName, opt => opt.MapFrom(src => src.Club.Name))
                .ForMember(dest => dest.ClubProfileImg, opt => opt.MapFrom(src => src.Club.ProfileImg))
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => new ClubPostAuthorDto
                {
                    Id = src.Club.Id,
                    Name = src.Club.Name,
                    ProfileImg = src.Club.ProfileImg
                }))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));
            CreateMap<ClubPost, AddClubPostDto>().ReverseMap();
            CreateMap<UpdateClubPostDto, ClubPost>()
               .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content)).ReverseMap();

            CreateMap<Reply, ReplyResponseDto>().ReverseMap();

            // Mapping for adding a club member
            CreateMap<AddClubMemberDto, User>().ReverseMap(); // This might need adjustments based on actual usage

            CreateMap<Faculty, FacultyDto>().ReverseMap().ForMember(opt => opt.Departments, d => d.MapFrom(s => s.Departments));
            CreateMap<Faculty, AddFacultyDto>().ReverseMap();
            CreateMap<Faculty, RemoveFacultyDto>().ReverseMap();
            CreateMap<Faculty, UpdateFacultyDto>().ReverseMap();

            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<Department, AddDepartmentDto>().ReverseMap();
            CreateMap<Department, RemoveDepartmentDto>().ReverseMap();
            CreateMap<Department, UpdateDepartmentDto>().ReverseMap();

        }
    }
}
