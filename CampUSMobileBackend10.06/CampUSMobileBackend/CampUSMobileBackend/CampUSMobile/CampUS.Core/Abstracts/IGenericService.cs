using System.Linq.Expressions;

namespace CampUS.Core.Abstracts
{
    public interface IGenericService<TEntity, TAddEntity, TUpdateDto, TRemoveEntity, TDto> where TDto : class where TEntity : class where TUpdateDto : class where TRemoveEntity : class
    {
        Task<TDto> GetByIdAsync(int id);
        Task<IEnumerable<TDto>> GetAllAsync();
        IQueryable<TDto> Where(Expression<Func<TEntity, bool>> expression);
        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> expression);
        Task<TDto> AddAsync(TAddEntity entityDto);
        Task<IEnumerable<TDto>> AddRangeAsync(IEnumerable<TAddEntity> entitiesDto);
        Task UpdateAsync(TUpdateDto entityDto);
        Task Remove(TRemoveEntity entityDto);
        Task RemoveRange(IEnumerable<TRemoveEntity> entitiesDto);
    }
}