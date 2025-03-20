using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.DTOs
{
    public class ChallengeVote
    {
        public int ChallengeId { get; set; }
        public string ChallengeTitle { get; set; }
        public int Votes { get; set; }
    }
}
