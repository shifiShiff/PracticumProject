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
        public Task<User> GetUserByIdAsync(string id);
        public Task<User> AddUserAsync(User user);
        public Task<bool> UpdateUserAsync(string id, User user);
        public Task<bool> DeleteUserAsync(string id);
        Task<User> GetUserByMail(string email);
    }
}
