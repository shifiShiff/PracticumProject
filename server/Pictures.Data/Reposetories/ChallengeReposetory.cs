﻿using Microsoft.EntityFrameworkCore;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Reposetory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Data.Reposetories
{
    public class ChallengeReposetory : IChallengeReposetory
    {
        private readonly DataContext _context;
        public ChallengeReposetory(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Challenge>> GetAllChallengesAsync()
        {
            return await _context.Challenges.ToListAsync();
        }

        public async Task<Challenge> GetChallengeById(int id)
        {
            return await _context.Challenges.FirstOrDefaultAsync(c => c.Id == id);

        }

        public async Task<int> GetCurrentChallengeAsync()
        {
            return await _context.Challenges
                    .Where(c => c.Active==true)
                    .Select(c => c.Id)
                    .FirstOrDefaultAsync();
        }

        public async Task<User> GetUserDetailByChallengeAsync(int challengeId)
        {
            var userId = await _context.Challenges
                            .Where(v => v.Id == challengeId)
                            .Select(v => v.WinnerId)
                            .FirstOrDefaultAsync();
            if (userId == 0)
            {
                return null;
            }

            var user = await _context.Users
                                      .Where(u => u.Id == userId)
                                      .FirstOrDefaultAsync();
            return user;
        }

        public async Task<List<ChallengeVote>> GetVotePerCahllengeAsync()
        {
            var votesPerChallenge = await (from vote in _context.Votes
                                           join challenge in _context.Challenges on vote.ChallengeId equals challenge.Id
                                           group vote by new { vote.ChallengeId, challenge.Title } into g
                                           select new ChallengeVote
                                           {
                                               ChallengeId = g.Key.ChallengeId,
                                               ChallengeTitle = g.Key.Title,
                                               Votes = g.Count()
                                           }).ToListAsync();

            return votesPerChallenge;

        }

        public async Task<bool> PostAsync(Challenge challenge)
        {
            await _context.Challenges.AddAsync(challenge);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> UpdateActiveAsync(int id)
        {
            var challenge = await _context.Challenges.FindAsync(id);
            if (challenge == null) return "";

            var topImage = await _context.Votes
            .Where(v => v.ChallengeId == id)
            .GroupBy(v => v.ImageId)
            .Select(g => new
            {
                ImageId = g.Key,
                VoteCount = g.Count()
            })
            .OrderByDescending(g => g.VoteCount)
            .Select(g => g.ImageId)
            .FirstOrDefaultAsync();

            if (topImage != 0)
            {

                var image = await _context.Images
                    .Where(i => i.Id == topImage)
                    .Select(i => new { i.Id, i.UserId })
                    .FirstOrDefaultAsync();

                Console.WriteLine("image " + image);
                if (image != null)
                {
                    challenge.WinnerImageId = image.Id; 
                    challenge.WinnerId = image.UserId;
                }
 
                challenge.Active = false;
                await _context.SaveChangesAsync();

                var winnerEmail = await _context.Users
                .Where(u => u.Id == image.UserId)
                .Select(u => u.Email)
                .FirstOrDefaultAsync();
                await _context.SaveChangesAsync();

                return winnerEmail;
            }
            return "";
        }
    }
}
