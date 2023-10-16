using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using CampUS.Core.Abstracts;
using CampUS.Core.Interfaces;

namespace CampUS.Repository.Infrastructures
{
	public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task AddAsync(T entity)
        {
            if (entity is ICreatedAt createdAtEntity)
            {
                createdAtEntity.CreatedAt = DateTime.UtcNow;
            }
            await _dbSet.AddAsync(entity);
            //await _context.SaveChangesAsync();
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await _dbSet.AddRangeAsync(entities);
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbSet.AnyAsync(expression);
        }

        public IQueryable<T> GetAll()
        {
            return _dbSet.AsNoTracking().AsQueryable();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Remove(T entity)
        {
            if (entity is IDeletable softDeletable)
            {
                softDeletable.IsDeleted = true;
                softDeletable.DeletedAt = DateTime.UtcNow;
                _dbSet.Update(entity);
            }
            else 
            {
                Task.FromResult(_dbSet.Remove(entity)); 
            }
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public void UpdateAsync(T entity)
        {
            if (entity is IUpdatedAt updatedAtEntity)
            {
                updatedAtEntity.UpdatedAt = DateTime.UtcNow;
            }
            Task.FromResult(_dbSet.Update(entity));
            //await _context.SaveChangesAsync();
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> expression)
        {
            return _dbSet.Where(expression);
        }
    }
}
