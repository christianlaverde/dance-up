using Microsoft.EntityFrameworkCore;
using DanceUp.Api.Models;

namespace DanceUp.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Studio> Studios { get; set; }
        public DbSet<Class> Classes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Studio>().ToTable("studios");
            modelBuilder.Entity<Class>().ToTable("classes");

            // Studio -> Owner (many-to-one)
            modelBuilder.Entity<Studio>()
                .HasOne(s => s.Owner)
                .WithMany(u => u.OwnedStudios)
                .HasForeignKey(s => s.OwnerId);

            // Class -> Studio (many-to-one)
            modelBuilder.Entity<Class>()
                .HasOne(c => c.Studio)
                .WithMany(s => s.Classes)
                .HasForeignKey(c => c.StudioId);

            // Class -> Instructor (many-to-one)
            modelBuilder.Entity<Class>()
                .HasOne(c => c.Instructor)
                .WithMany(u => u.InstructedClasses)
                .HasForeignKey(c => c.InstructorId);

            // User <-> Studio (many-to-many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Studios)
                .WithMany(s => s.Users)
                .UsingEntity<Dictionary<string, object>>(
                        "studio_members",
                        j => j.HasOne<Studio>().WithMany().HasForeignKey("studio_id"),
                        j => j.HasOne<User>().WithMany().HasForeignKey("user_id"),
                        j => {
                            j.HasKey("studio_id", "user_id");
                            j.Property<DateTime>("joined_at");
                        });
        }
    }
}
