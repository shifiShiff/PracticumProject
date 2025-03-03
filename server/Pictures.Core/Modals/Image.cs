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
        public int Id { get; set; } // מזהה ייחודי
        public int UserId { get; set; } // FK למשתמש שהעלה
        public int ChallengeId { get; set; }
        public string ImageUrl { get; set; } = string.Empty; // URL של התמונה (S3 או לוקאלי)
        public int Votes { get; set; } = 0; // כמות הצבעות
        public DateTime CreatedAt { get; set; } = DateTime.Now; // תאריך העלאה
    }
}
