using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.DTOs
{
    public class UserPost
    {
        public string UserId { get; set; }
        public string Name { get; set; }// שם משתמש
        public string Email { get; set; } // אימייל ייחודי
        public string PasswordHash { get; set; } // סיסמה מוצפנת
    }
}
