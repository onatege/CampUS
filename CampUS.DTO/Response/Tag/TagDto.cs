using CampUS.DTO.Response.Post;

namespace CampUS.DTO.Response.Tag
{
    public class TagDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PostResponseDto> Posts { get; set; }
    }
}
