using job_dut.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace job_dut.Databases
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Role> Roles { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<UserKeySkill> UserKeySkill { get; set; }
        public DbSet<ProfileUser> ProfileUsers { get; set; }

        public DbSet<Faculty> Faculties { get; set; }

        public DbSet<KeySkill> KeySkills { get; set; }

        public DbSet<OvertimeType> OvertimeTypes { get; set; }

        public DbSet<Company> Companies { get; set; }
        public DbSet<CompanyKeySkill> CompanyKeySkills { get; set; }

        public DbSet<Post> Posts { get; set; }
        //public DbSet<PostFaculty> PostFaculties { get; set; }
        public DbSet<PostKeySkill> PostKeySkills { get; set; }
        public DbSet<JobType> JobTypes { get; set; }

        public DbSet<UserJobApply> UserJobApplies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //config many-to-many between user and keyskill
            modelBuilder.Entity<UserKeySkill>()
                .HasKey(uk => new {
                    uk.UserID,
                    uk.KeySkillID
                });

            modelBuilder.Entity<UserKeySkill>()
                .HasOne(u => u.User)
                .WithMany(uk => uk.UserKeySkills)
                .HasForeignKey(uk => uk.UserID);

            modelBuilder.Entity<UserKeySkill>()
                .HasOne(k => k.KeySkill)
                .WithMany(uk => uk.UserKeySkills)
                .HasForeignKey(uk => uk.KeySkillID);


            // one-to-many between user and company
            //1 user manage a lot of companies
            modelBuilder.Entity<Company>()
                .HasOne(e => e.User)
                .WithMany(c => c.Companies);

            //user - role
            modelBuilder.Entity<User>()
                .HasOne(e => e.Role)
                .WithMany(c => c.Users);


            //many-to-many between company and keyskill
            modelBuilder.Entity<CompanyKeySkill>()
               .HasKey(ck => new {
                   ck.CompanyID,
                   ck.KeySkillID
               });

            modelBuilder.Entity<CompanyKeySkill>()
                .HasOne(c => c.Company)
                .WithMany(ck => ck.CompanyKeySkills)
                .HasForeignKey(uk => uk.CompanyID);

            modelBuilder.Entity<CompanyKeySkill>()
                .HasOne(k => k.KeySkill)
                .WithMany(uk => uk.CompanyKeySkills)
                .HasForeignKey(uk => uk.KeySkillID);

            //company - faculty
            modelBuilder.Entity<Company>()
                .HasOne(e => e.Faculty)
                .WithMany(c => c.Companies);

            //config many-to-many between post and keyskill
            modelBuilder.Entity<PostKeySkill>()
                .HasKey(pk => new {
                    pk.PostID,
                    pk.KeySkillID
                });

            modelBuilder.Entity<PostKeySkill>()
                .HasOne(u => u.Post)
                .WithMany(uk => uk.PostKeySkills)
                .HasForeignKey(uk => uk.PostID);

            modelBuilder.Entity<PostKeySkill>()
                .HasOne(k => k.KeySkill)
                .WithMany(uk => uk.PostKeySkills)
                .HasForeignKey(uk => uk.KeySkillID);

            ////config many-to-many between post and user (user apply job)
            modelBuilder.Entity<UserJobApply>()
                .HasKey(pk => new
                {
                    pk.PostID,
                    pk.UserID
                });

            modelBuilder.Entity<UserJobApply>()
                .HasOne(u => u.Post)
                .WithMany(uk => uk.UserJobApplies)
                .HasForeignKey(uk => uk.PostID);

            modelBuilder.Entity<UserJobApply>()
                .HasOne(k => k.User)
                .WithMany(uk => uk.UserJobApplies)
                .HasForeignKey(uk => uk.UserID);
        }
    }
}
