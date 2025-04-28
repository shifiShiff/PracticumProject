using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Reposetory
{
    public interface IImageReposetory
    {
        public Task<List<Image>> GetAllImagesAsync();
        public Task<Image> GetTopImageAsync(int ChallengeId);
        public Task<List<Image>> GetImagesByChallengeAsync(int ChallengeId);
        public Task<Image> GetImageByIdAsync(int imageId);
        public Task<bool> AddImageAsync(Image image);
        public Task<bool> UpdateImageAsync(int id, Image image);
        public Task<bool> DeleteImageAsync(int id);
        public Task<bool> UpdateImageVoteAsync(int id);
    }
}
