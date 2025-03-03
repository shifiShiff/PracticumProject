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
        public int Id { get; set; } // מזהה ייחודי
        public int UserId { get; set; } // מזהה המשתמש שהצביע
        public int ChallengeId { get; set; }
        public int ImageId { get; set; } // מזהה התמונה אליה ההצבעה שייכת
        public DateTime CreatedAt { get; set; } = DateTime.Now; // תאריך יצירת ההצבעה

       
    }
}
