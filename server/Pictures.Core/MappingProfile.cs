using AutoMapper;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserPost,User>().ReverseMap();
            CreateMap<ImagePost,Image>().ReverseMap();
            CreateMap<VotePost,Vote>().ReverseMap();
            CreateMap<ChallengePost,Challenge>().ReverseMap();
        }
    }
}
