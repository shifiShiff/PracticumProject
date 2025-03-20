using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Modals
{
    public class Challenge
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; }
        public bool Active { get; set; } = true;
        public int WinnerId { get; set; } 
        public int WinnerImageId { get; set; }  
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

}
