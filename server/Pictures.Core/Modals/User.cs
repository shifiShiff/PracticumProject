using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Pictures.Core.Modals
{
    public class User
    {
        public int Id { get; set; } // מזהה ייחודי
        public string Name { get; set; } = string.Empty; // שם משתמש
        public string Email { get; set; } = string.Empty; // אימייל ייחודי
        public string PasswordHash { get; set; } = string.Empty; // סיסמה מוצפנת
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // תאריך יצירה
        public List<Image> Images { get; set; } = new List<Image>(); // תמונות שהמשתמש העלה
    }

}
