using AutoMapper;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;
using CampUS.DTO.Request.Reply;
using CampUS.Repository.Infrastructures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampUS.Service.Concrete
{
    public class ReplyService : Service<Reply>, IReplyService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<Reply> _repository;

        public ReplyService(IGenericRepository<Reply> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _repository = repository;
        }

        public async Task AddReplyAsync(AddReplyDto replyDto)
        {
           var reply = _mapper.Map<Reply>(replyDto);
           await _repository.AddAsync(reply);
           await _unitOfWork.CommitAsync();


        }
    }
}
