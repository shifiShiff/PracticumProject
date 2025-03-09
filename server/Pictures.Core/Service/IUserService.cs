using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Service
{
    public interface IUserService
    {
        public Task<List<User>> GetAllUsersAsync();
        public Task<User> GetUserByIdAsync(string id);
        public Task<bool> AddUserAsync(UserPost user);
        public Task<bool> UpdateUserAsync(string id,UserPost user);
        public Task<bool> DeleteUserAsync(string id);
        string GenerateJwtToken(string email, string role);
        Task<User> GetUserByMail(string email);

    }
}
