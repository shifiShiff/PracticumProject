using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.DTOs
{
    public class UserPost
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty; // שם משתמש
        public string Email { get; set; } = string.Empty; // אימייל ייחודי
        public string PasswordHash { get; set; } = string.Empty; // סיסמה מוצפנת
    }
}
