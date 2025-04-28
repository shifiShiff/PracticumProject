using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Modals
{
    public class Image
    {
        [Key]
        public int Id { get; set; } 
        public string FileName { get; set; }
        public int UserId { get; set; } 
        public int ChallengeId { get; set; }
        public string ImageUrl { get; set; } 
        public int Votes { get; set; } = 0; 
        public DateTime UploadedAt { get; set; } = DateTime.Now; 
    }
}
