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
        public int Id { get; set; }
        public string UserId { get; set; } 
        public string Name { get; set; } 
        public string Email { get; set; }  
        public string PasswordHash { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.Now; 
        public string Role { get; set; } = "User"; 

    }

}
