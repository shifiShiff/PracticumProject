using AutoMapper;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Reposetory;
using Pictures.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Services
{
    public class UserService:IUserService
    {
        private readonly IUserReposetory _userReposetory;
        private readonly IMapper _mapper;
        public UserService(IUserReposetory userReposetory, IMapper mapper)
        {
            _userReposetory = userReposetory;
            _mapper=mapper;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userReposetory.GetAllUsersAsync();
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            return await _userReposetory.GetUserByIdAsync(id);
        }

        public async Task<bool> AddUserAsync(UserPost user)
        {
            var tmp = _mapper.Map<User>(user);
            return await _userReposetory.AddUserAsync(tmp);
        }

        public async Task<bool> UpdateUserAsync(string id, UserPost user)
        {
            var tmp = _mapper.Map<User>(user) ;
            return await _userReposetory.UpdateUserAsync(id, tmp);
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            return await _userReposetory.DeleteUserAsync(id);
        }
    }
}
