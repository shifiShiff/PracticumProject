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
    public class VoteReposetory:IVoteReposetory
    {
        private readonly DataContext _context;
        public VoteReposetory(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AddVote(Vote vote)
        {
            var existingVote = await _context.Votes
            .FirstOrDefaultAsync(v => v.UserId == vote.UserId && v.ImageId == vote.ImageId);

            if (existingVote != null)
            {
                _context.Votes.Add(vote);
                _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
