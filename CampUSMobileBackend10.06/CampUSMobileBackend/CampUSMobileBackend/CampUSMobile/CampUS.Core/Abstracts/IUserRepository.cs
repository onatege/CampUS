using System.Linq.Expressions;
using CampUS.Core.Abstracts;
using CampUS.Core.Models;

namespace CampUS.Core.Interfaces
{
	public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> FindUserByIdAsync(int id);
        Task<User> GetUserForActivationAsync(int id);
        Task<User> GetUserWithFollowersByIdAsync(int userId);
        Task<List<User>> GetAllUsers();

        Task<bool> AnyDeactiveUserAsync(Expression<Func<User, bool>> expression);
          User GetUserWithRole(int userId);
    }
}
