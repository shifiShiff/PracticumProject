using Microsoft.EntityFrameworkCore;
using Pictures.Core.Modals;
using Pictures.Core.Reposetory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Data.Reposetories
{
    public class UserReposeroty : IUserReposetory
    {
        private readonly DataContext _context;

        public UserReposeroty(DataContext context)
        {
            _context = context;
        }
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.UserId == id);
        }
        public async Task<User> GetUserByMail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));
            return user;

        }
        public async Task<User> AddUserAsync(User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return null; // המשתמש כבר קיים
            }
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.PasswordHash = passwordHash;
            user.Role = "User";


            _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> AddAdminAsync(User user)
        {

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return null; // המשתמש כבר קיים
            }
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.PasswordHash = passwordHash;
            user.Role = "Admin";


            _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UpdateUserAsync(string id, User user)
        {
            var originUser=await GetUserByIdAsync(id);
            if (originUser != null)
            {
                originUser.Name = user.Name;
                originUser.Email = user.Email;
                originUser.UserId = user.UserId;
                originUser.PasswordHash = user.PasswordHash;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            //var user = await GetUserByIdAsync(id);
            var user = await _context.Users.FirstOrDefaultAsync(user => user.UserId == id);
            //if (user != null)
            //{
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                Console.WriteLine("deleted");
                return true;
            //}
            //return false;
        }

       
    }
}
