using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Service
{
    public interface IChallengeService
    {
        Task<int> GetCurrentChallengeAsync();

        Task<bool> PostAsync(ChallengePost challenge);
        Task<string> UpdateActiveAsync(int id);
        Task<Challenge> GetChallengeById(int id);
        Task<List<ChallengeVote>> GetVotePerCahllengeAsync();
        Task<List<Challenge>> GetAllChallengesAsync();
        Task<User> GetUserDetailByChallengeAsync(int challengeId);

        Task SendEmailAsync(string toEmail, string subject, string body);


    }
}
