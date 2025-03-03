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
    }
}
