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
    public class ImageReposetory : IImageReposetory
    {
        private readonly DataContext _context;
        public ImageReposetory(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Image>> GetAllImagesAsync()
        {
            return await _context.Images.ToListAsync();
        }

        public async Task<Image> GetTopImageAsync(int ChallengeId)
        {
            var topVotedImage = await _context.Images
             .Where(img => img.ChallengeId == ChallengeId)
             .OrderByDescending(img => img.Votes)
             .FirstOrDefaultAsync();
            return topVotedImage;

        }

        public async Task<List<Image>> GetImagesByChallengeAsync(int ChallengeId)
        {
            var topVotedImage = await _context.Images
             .Where(img => img.ChallengeId == ChallengeId).ToListAsync();
             
            return topVotedImage;

        }

        public async Task<bool> AddImageAsync(Image image)
        {
            _context.Images.Add(image);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateImageAsync(int id, Image image)
        {
            var originalImage = await _context.Images.FirstOrDefaultAsync(img=>img.Id == id);
            if (originalImage != null)
            {
                originalImage.Votes = image.Votes;
                originalImage.UserId = image.UserId;
                originalImage.ChallengeId = image.ChallengeId;
                originalImage.ImageUrl = image.ImageUrl;
                _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteImageAsync(int id)
        {
            var originalImage = await _context.Images.FirstOrDefaultAsync(img => img.Id == id);
            if (originalImage != null)
            {
                _context.Images.Remove(originalImage);
                _context.SaveChangesAsync();
                return true;
            }
            return false;

        }

        public async Task<bool> UpdateImageVoteAsync(int id)
        {
            var originalImage = await _context.Images.FirstOrDefaultAsync(img => img.Id == id);
            if (originalImage != null)
            {
                originalImage.Votes=originalImage.Votes+1;
                _context.SaveChangesAsync();
                return true;
            }
            return false;

        }
    }
}
