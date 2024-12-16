using CampUS.DTO.Response.Post;
using CampUS.DTO.Response.User;

namespace CampUS.DTO.Response.Tag
{
    public class TrendingTagsResponseDto
    {
        public int Id { get; set; }
        public ICollection<PostDto> post { get; set; }
        public string Name { get; set; }
        public int PostCount { get; set; }
    }
}
