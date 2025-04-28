using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Modals
{
    public class Vote
    {
        [Key]
        public int Id { get; set; } 
        public int UserId { get; set; } 
        public int ChallengeId { get; set; }
        public int ImageId { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.Now; 

       
    }
}
