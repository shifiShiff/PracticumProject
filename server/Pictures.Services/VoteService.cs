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
    public class VoteService:IVoteService
    {
        private readonly IVoteReposetory _voteReposetory;
        private readonly IMapper _mapper;
        public VoteService(IVoteReposetory voteReposetory, IMapper mapper)
        {
            _voteReposetory = voteReposetory;
            _mapper = mapper;
        }

        public async Task<bool> AddVote(VotePost vote)
        {
            var tmp=_mapper.Map<Vote>(vote);
            return await _voteReposetory.AddVote(tmp);
        }
    }
}
