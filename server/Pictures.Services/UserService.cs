using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Reposetory;
using Pictures.Core.Service;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Services
{
    public class UserService:IUserService
    {
        private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
        private readonly IUserReposetory _userReposetory;
        private readonly IMapper _mapper;
        public UserService(IUserReposetory userReposetory, IMapper mapper, Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            _userReposetory = userReposetory;
            _mapper=mapper;
            _configuration = configuration;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userReposetory.GetAllUsersAsync();
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            return await _userReposetory.GetUserByIdAsync(id);
        }

        public async Task<User> AddUserAsync(UserPost user)
        {
            var tmp = _mapper.Map<User>(user);
            return await _userReposetory.AddUserAsync(tmp);
            
        }

        public async Task<User> GetUserByMail(string email)
        {
            return await _userReposetory.GetUserByMail(email);
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

        public string GenerateJwtToken(int id,string username, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role) ,
            new Claim("userId", id.ToString()) 
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

      
    }
}
