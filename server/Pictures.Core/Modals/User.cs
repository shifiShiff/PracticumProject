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
        public string UserId { get; set; } 
        public string Name { get; set; } // שם משתמש
        public string Email { get; set; }  // אימייל ייחודי
        public string PasswordHash { get; set; } // סיסמה מוצפנת
        public DateTime CreatedAt { get; set; } = DateTime.Now; // תאריך יצירה
        public string Role { get; set; } = "User"; // "User" = משתמש רגיל, "Admin" = מנהל

    }

}
