using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Reposetory
{
    public interface IChallengeReposetory
    {
        Task<int> GetCurrentChallengeAsync();
        Task<bool> PostAsync(Challenge challenge);
        Task<string> UpdateActiveAsync(int id);
        Task<Challenge> GetChallengeById(int id);
        Task<List<ChallengeVoteDto>> GetVotePerCahllengeAsync();
        Task<List<Challenge>> GetAllChallengesAsync();
        Task<User> GetUserDetailByChallengeAsync(int challengeId);

    }
}
