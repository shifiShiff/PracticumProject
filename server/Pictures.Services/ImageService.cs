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
    public class ImageService:IImageService
    {
        private readonly IImageReposetory _imageReposetory;
        private readonly IMapper _mapper;


        public ImageService(IImageReposetory imageReposetory, IMapper mapper)
        {
            _imageReposetory = imageReposetory;
            _mapper = mapper;
        }

        public async Task<List<Image>> GetAllImagesAsync()
        {
            return await _imageReposetory.GetAllImagesAsync();
        }

        public async Task<Image> GetTopImageAsync(int ChallengeId)
        {
            return await _imageReposetory.GetTopImageAsync(ChallengeId);
        }

        public async Task<List<Image>> GetImagesByChallengeAsync(int ChallengeId)
        {
            return await _imageReposetory.GetImagesByChallengeAsync(ChallengeId);
        }

        public async Task<bool> AddImageAsync(ImagePost image)
        {
            var tmp = _mapper.Map<Image>(image);
            return await _imageReposetory.AddImageAsync(tmp);
        }
        public async Task<bool> AddImageAsync(Image image)
        {
            //var tmp= _mapper.Map<Image>(image);
            return await _imageReposetory.AddImageAsync(image);
        }

        public async Task<bool> UpdateImageAsync(int id, ImagePost image)
        {
            var tmp = _mapper.Map<Image>(image);
            return await _imageReposetory.UpdateImageAsync(id, tmp);
        }

        public async Task<bool> DeleteImageAsync(int id)
        {
            return await _imageReposetory.DeleteImageAsync(id);
        }

        public async Task<bool> UpdateImageVoteAsync(int id)
        {
            return await _imageReposetory.UpdateImageVoteAsync(id);
        }
    }
}
