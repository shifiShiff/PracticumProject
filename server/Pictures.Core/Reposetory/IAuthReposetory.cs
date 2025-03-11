﻿using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Reposetory
{
    public interface IAuthReposetory
    {
        Task<User> GetUserByMail(string email);

    }
}
