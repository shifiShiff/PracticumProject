using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Service
{
    public interface IAuthService
    {
        Task<User> GetUserByMail(string email);
        string GenerateJwtToken(string email, string role);
    }
}
