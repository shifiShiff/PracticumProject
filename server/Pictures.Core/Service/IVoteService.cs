using Pictures.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Service
{
    public interface IVoteService
    {
        Task<bool> AddVote(VotePost vote);
    }
}
