using System.Linq.Expressions;
using AutoMapper;
using CampUS.Core.Abstracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace CampUS.Service.Concrete
{


    public class GenericService<TEntity, TAddEntity, TUpdateEntity, TRemoveEntity, TDto> : IGenericService<TEntity, TAddEntity, TUpdateEntity, TRemoveEntity, TDto> where TDto : class where TEntity : class where TUpdateEntity : class
where TRemoveEntity : class
    {

        protected readonly IMapper _mapper;
        protected readonly IGenericRepository<TEntity> _genericRepository;
        protected readonly IUnitOfWork _unitOfWork;

        public GenericService(IMapper mapper, IGenericRepository<TEntity> genericRepository, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _genericRepository = genericRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<TDto> AddAsync(TAddEntity entityDto)
        {
            var entity = _mapper.Map<TEntity>(entityDto);
            await _genericRepository.AddAsync(entity);
            await _unitOfWork.CommitAsync();
            return _mapper.Map<TDto>(entity);
        }

        public async Task<IEnumerable<TDto>> AddRangeAsync(IEnumerable<TAddEntity> entitiesDto)
        {
            var entities = _mapper.Map<IEnumerable<TEntity>>(entitiesDto);
            await _genericRepository.AddRangeAsync(entities);
            await _unitOfWork.CommitAsync();
            return _mapper.Map<IEnumerable<TDto>>(entitiesDto);
        }

        public Task<bool> AnyAsync(Expression<Func<TEntity, bool>> expression)
        {
            var expressionEntity = _mapper.Map<Expression<Func<TEntity, bool>>>(expression);
            return _genericRepository.AnyAsync(expressionEntity);
        }

        public async Task<IEnumerable<TDto>> GetAllAsync()
        {
            var entities = await _genericRepository.GetAll().ToListAsync();
            return _mapper.Map<IEnumerable<TDto>>(entities);
        }

        public async Task<TDto> GetByIdAsync(int id)
        {
            return _mapper.Map<TDto>(await _genericRepository.GetByIdAsync(id));
        }

        public async Task Remove(TRemoveEntity entityDto)
        {
            var entity = _mapper.Map<TEntity>(entityDto);
            _genericRepository.Remove(entity);
            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveRange(IEnumerable<TRemoveEntity> entitiesDto)
        {
            var entities = _mapper.Map<IEnumerable<TEntity>>(entitiesDto);
            _genericRepository.RemoveRange(entities);
            await _unitOfWork.CommitAsync();
        }

        public async Task UpdateAsync(TUpdateEntity entityDto)
        {
            _genericRepository.UpdateAsync(_mapper.Map<TEntity>(entityDto));
            await _unitOfWork.CommitAsync();
        }

        public IQueryable<TDto> Where(Expression<Func<TEntity, bool>> expression)
        {
            return _mapper.Map<IQueryable<TDto>>(expression);
        }



    }
}