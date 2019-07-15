﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using job_dut.Databases;

namespace job_dut.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("job_dut.Models.Company", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Avatar");

                    b.Property<string>("Backgroud1");

                    b.Property<string>("Backgroud2");

                    b.Property<string>("Backgroud3");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<bool>("DeleteFlag");

                    b.Property<string>("Description");

                    b.Property<string>("Email");

                    b.Property<long>("EmployeeFrom");

                    b.Property<long>("EmployeeTo");

                    b.Property<string>("Facebook");

                    b.Property<long>("FacultyID");

                    b.Property<bool>("IsActive");

                    b.Property<string>("Name");

                    b.Property<long>("OvertimeTypeID");

                    b.Property<string>("Phone");

                    b.Property<string>("TimeWorkFrom");

                    b.Property<string>("TimeWorkTo");

                    b.Property<string>("Title");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<long>("UserID");

                    b.Property<string>("Website");

                    b.HasKey("ID");

                    b.HasIndex("FacultyID");

                    b.HasIndex("OvertimeTypeID");

                    b.HasIndex("UserID");

                    b.ToTable("Company");
                });

            modelBuilder.Entity("job_dut.Models.CompanyKeySkill", b =>
                {
                    b.Property<long>("CompanyID");

                    b.Property<long>("KeySkillID");

                    b.HasKey("CompanyID", "KeySkillID");

                    b.HasIndex("KeySkillID");

                    b.ToTable("CompanyKeySkill");
                });

            modelBuilder.Entity("job_dut.Models.Faculty", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Avatar");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<bool>("DeleteFlag");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("ID");

                    b.ToTable("Faculty");
                });

            modelBuilder.Entity("job_dut.Models.JobType", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<bool>("DeleteFlag");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("ID");

                    b.ToTable("JobType");
                });

            modelBuilder.Entity("job_dut.Models.KeySkill", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<bool>("DeleteFlag");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("ID");

                    b.ToTable("KeySkill");
                });

            modelBuilder.Entity("job_dut.Models.OvertimeType", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<bool>("DeleteFlag");

                    b.Property<string>("Name");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("ID");

                    b.ToTable("OvertimeType");
                });

            modelBuilder.Entity("job_dut.Models.Post", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Benefit");

                    b.Property<long>("CompanyID");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("DateExpire");

                    b.Property<bool>("DeleteFlag");

                    b.Property<string>("Description");

                    b.Property<string>("Experience");

                    b.Property<bool>("IsDisplay");

                    b.Property<long>("JobTypeID");

                    b.Property<long>("NumberView");

                    b.Property<string>("Reason");

                    b.Property<string>("Salary");

                    b.Property<string>("Title");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("ID");

                    b.HasIndex("CompanyID");

                    b.HasIndex("JobTypeID");

                    b.ToTable("Post");
                });

            modelBuilder.Entity("job_dut.Models.PostFaculty", b =>
                {
                    b.Property<long>("PostID");

                    b.Property<long>("FacultyID");

                    b.HasKey("PostID", "FacultyID");

                    b.HasIndex("FacultyID");

                    b.ToTable("PostFaculty");
                });

            modelBuilder.Entity("job_dut.Models.PostKeySkill", b =>
                {
                    b.Property<long>("PostID");

                    b.Property<long>("KeySkillID");

                    b.HasKey("PostID", "KeySkillID");

                    b.HasIndex("KeySkillID");

                    b.ToTable("PostKeySkill");
                });

            modelBuilder.Entity("job_dut.Models.ProfileUser", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AboutMe");

                    b.Property<string>("Address");

                    b.Property<string>("Avatar");

                    b.Property<string>("CVLink");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("DOB");

                    b.Property<bool>("DeleteFlag");

                    b.Property<long>("FacultyID");

                    b.Property<string>("Fullname");

                    b.Property<string>("Phone");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<long>("UserID");

                    b.Property<string>("Website");

                    b.HasKey("ID");

                    b.HasIndex("FacultyID");

                    b.HasIndex("UserID");

                    b.ToTable("Profile");
                });

            modelBuilder.Entity("job_dut.Models.Role", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<bool>("DeleteFlag");

                    b.Property<string>("Name");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("ID");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("job_dut.Models.User", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<bool>("DeleteFlag");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsReceiveEmail");

                    b.Property<string>("Password");

                    b.Property<long>("RoleID");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<string>("Username");

                    b.HasKey("ID");

                    b.HasIndex("RoleID");

                    b.ToTable("User");
                });

            modelBuilder.Entity("job_dut.Models.UserKeySkill", b =>
                {
                    b.Property<long>("UserID");

                    b.Property<long>("KeySkillID");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<bool>("DeleteFlag");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("UserID", "KeySkillID");

                    b.HasIndex("KeySkillID");

                    b.ToTable("UserKeySkill");
                });

            modelBuilder.Entity("job_dut.Models.Company", b =>
                {
                    b.HasOne("job_dut.Models.Faculty", "Faculty")
                        .WithMany("Companies")
                        .HasForeignKey("FacultyID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("job_dut.Models.OvertimeType", "OvertimeType")
                        .WithMany()
                        .HasForeignKey("OvertimeTypeID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("job_dut.Models.User", "User")
                        .WithMany("Companies")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("job_dut.Models.CompanyKeySkill", b =>
                {
                    b.HasOne("job_dut.Models.Company", "Company")
                        .WithMany("CompanyKeySkills")
                        .HasForeignKey("CompanyID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("job_dut.Models.KeySkill", "KeySkill")
                        .WithMany("CompanyKeySkills")
                        .HasForeignKey("KeySkillID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("job_dut.Models.Post", b =>
                {
                    b.HasOne("job_dut.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("job_dut.Models.JobType", "JobType")
                        .WithMany()
                        .HasForeignKey("JobTypeID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("job_dut.Models.PostFaculty", b =>
                {
                    b.HasOne("job_dut.Models.Faculty", "Faculty")
                        .WithMany("PostFaculties")
                        .HasForeignKey("FacultyID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("job_dut.Models.Post", "Post")
                        .WithMany("PostFaculties")
                        .HasForeignKey("PostID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("job_dut.Models.PostKeySkill", b =>
                {
                    b.HasOne("job_dut.Models.KeySkill", "KeySkill")
                        .WithMany("PostKeySkills")
                        .HasForeignKey("KeySkillID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("job_dut.Models.Post", "Post")
                        .WithMany("PostKeySkills")
                        .HasForeignKey("PostID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("job_dut.Models.ProfileUser", b =>
                {
                    b.HasOne("job_dut.Models.Faculty", "Faculty")
                        .WithMany("ProfileUsers")
                        .HasForeignKey("FacultyID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("job_dut.Models.User", "User")
                        .WithMany("ProfileUsers")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("job_dut.Models.User", b =>
                {
                    b.HasOne("job_dut.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("job_dut.Models.UserKeySkill", b =>
                {
                    b.HasOne("job_dut.Models.KeySkill", "KeySkill")
                        .WithMany("UserKeySkills")
                        .HasForeignKey("KeySkillID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("job_dut.Models.User", "User")
                        .WithMany("UserKeySkills")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}