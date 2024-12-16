using CampUS.Core.Models;
using CampUS.DTO.Request.Reply;
using CampUS.DTO.Response.Reply;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampUS.Core.Abstracts
{
    public interface IReplyService : IService<Reply>
    {
        Task AddReplyAsync(AddReplyDto reply);
    }
}
