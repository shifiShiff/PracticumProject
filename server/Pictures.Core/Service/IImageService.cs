﻿using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Service
{
    public interface IImageService
    {
        public Task<List<Image>> GetAllImagesAsync();
        public Task<Image> GetTopImageAsync(int ChallengeId);
        public Task<List<Image>> GetImagesByChallengeAsync(int ChallengeId);
        public Task<Image> GetImageByIdAsync(int imageId);

        public Task<bool> AddImageAsync(Image image);
        public Task<bool> UpdateImageAsync(int id, ImagePost image);
        public Task<bool> DeleteImageAsync(int id);
        public Task<bool> UpdateImageVoteAsync(int id);

    }
}
