using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Reposetory
{
    public interface IUserReposetory
    {
        public Task<List<User>> GetAllUsersAsync();
        public Task<User> GetUserByIdAsync(int id);
        public Task<bool> AddUserAsync(User user);
        public Task<bool> UpdateUserAsync(int id, User user);
        public Task<bool> DeleteUserAsync(int id);
    }
}
