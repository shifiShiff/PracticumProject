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
    }
}
