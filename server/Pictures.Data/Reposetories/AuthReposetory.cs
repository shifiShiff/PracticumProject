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
    public class AuthReposetory:IAuthReposetory
    {
        private readonly DataContext _context;
        public AuthReposetory(DataContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByMail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));
            return user;

        }
    }
}
