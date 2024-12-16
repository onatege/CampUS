using CampUS.DTO.Request.Tag;
using CampUS.DTO.Response;
using CampUS.DTO.Response.Tag;

namespace CampUS.Core.Abstracts
{
    public interface ITagService
    {
        Task<List<TagDto>> GetAllTagsAsync();
        Task<TagDto> GetTagByIdAsync(int id);
        Task<List<TrendingTagsResponseDto>> GetTrendingTagsAsync();
        Task AddTagAsync(AddTagDto addTagDto);
        Task RemoveTagAsync(int id);
        Task<CustomResponseDto> FindTag(string Keyword);
    }
}
