﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.DTOs
{
    public class VotePost
    {
        public int UserId { get; set; } 
        public int ChallengeId { get; set; }
        public int ImageId { get; set; } 
    }
}
