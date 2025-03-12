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
    public class ChallengeService:IChallengeService
    {

        private readonly IChallengeReposetory _challengeReposetory;
        private readonly IMapper _mapper;
        public ChallengeService(IChallengeReposetory challengeReposetory,IMapper mapper)
        {
            _challengeReposetory = challengeReposetory;
            _mapper = mapper;
        }

        public Task<Challenge> GetChallengeById(int id)
        {
            return _challengeReposetory.GetChallengeById(id);
        }

        public async Task<int> GetCurrentChallengeAsync()
        {
            return await _challengeReposetory.GetCurrentChallengeAsync();
        }

        public async Task<bool> PostAsync(ChallengePost challenge)
        {
            var tmp =_mapper.Map<Challenge>(challenge);
            return await _challengeReposetory.PostAsync(tmp);
        }

        public async Task<bool> UpdateActiveAsync(int id)
        {
            return await _challengeReposetory.UpdateActiveAsync(id);
        }
    }
}
