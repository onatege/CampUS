using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using CampUS.Core.Abstracts;
using CampUS.Core.Interfaces;
using CampUS.Core.Models;

namespace CampUS.Repository.Infrastructures
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly DbSet<User> _user;
        public UserRepository(AppDbContext context) : base(context)
        {
            _user = context.Set<User>();
        }

        public async Task<User> GetUserForActivationAsync(int id)
        {
            var user = await _user.IgnoreQueryFilters().FirstOrDefaultAsync(x => x.Id == id);
            return user;
        }

        public async Task<bool> AnyDeactiveUserAsync(Expression<Func<User, bool>> expression)
        {
            return await _user.IgnoreQueryFilters().AnyAsync(expression);
        }

        public async Task<User> FindUserByIdAsync(int id)
        {
            var user = await _user.Where(u => u.Id == id).FirstOrDefaultAsync();
            return user;
        }

        public async Task<User> GetUserWithFollowersByIdAsync(int userId)
        {
            var user = await _user.Where(u => u.Id == userId).Include(u => u.Followers).Include(u => u.Following).Include(p => p.Posts).ThenInclude(l => l.Likes).Include(c => c.JoinedClubs).FirstOrDefaultAsync();
            return user;
        }

        public async Task<List<User>> GetAllUsers()
        {
            var users = await _user.Include(u => u.Followers).Include(u => u.Following).Include(p => p.Posts).ThenInclude(l => l.Likes).Include(c => c.JoinedClubs).ToListAsync();
            return users;
        }

        public  User GetUserWithRole(int userId)
        {
            return _user.Include(x=>x.Role).Where(usr=>usr.Id==userId).IgnoreQueryFilters().FirstOrDefault();
        }


    }
}
