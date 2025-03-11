using Microsoft.EntityFrameworkCore;
using Pictures.Core.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Data
{
    public class DataContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<Vote> Votes { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=PhotoTop_project");
        }
    }
}
