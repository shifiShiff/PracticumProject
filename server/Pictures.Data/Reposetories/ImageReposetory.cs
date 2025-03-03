using Pictures.Core.Reposetory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Data.Reposetories
{
    public class ImageReposetory:IImageReposetory
    {
        private readonly DataContext _context;
    }
}
