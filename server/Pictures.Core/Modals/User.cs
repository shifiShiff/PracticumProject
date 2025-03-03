using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Pictures.Core.Modals
{
    public class User
    {
        [Key]
        public int Id { get; set; } // מזהה ייחודי
        public int UserId { get; set; } 
        public string Name { get; set; } = string.Empty; // שם משתמש
        public string Email { get; set; } = string.Empty; // אימייל ייחודי
        public string PasswordHash { get; set; } = string.Empty; // סיסמה מוצפנת
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // תאריך יצירה
        public List<Image> Images { get; set; } = new List<Image>(); // תמונות שהמשתמש העלה
    }

}
