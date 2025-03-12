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
    public class ChallengeReposetory :IChallengeReposetory
    {
        private readonly DataContext _context;
        public ChallengeReposetory(DataContext context)
        {
            _context = context;
        }

        public async Task<Challenge> GetChallengeById(int id)
        {
            return await _context.Challenges.FirstOrDefaultAsync(c => c.Id == id);

        }

        public async Task<int> GetCurrentChallengeAsync()
        {
            return await _context.Challenges
                    .Where(c => c.Active)
                    .Select(c => c.Id)
                    .SingleAsync();
        }

        public async Task<bool> PostAsync(Challenge challenge)
        {
            await _context.Challenges.AddAsync(challenge);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateActiveAsync(int id)
        {
            var challenge = await _context.Challenges.FindAsync(id);
            if (challenge == null) return false;

            challenge.Active = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
