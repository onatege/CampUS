using Microsoft.EntityFrameworkCore;
using System.Reflection;
using CampUS.Core.Models;
using CampUS.Core.Abstracts;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace CampUS.Repository
{
    public class AppDbContext : DbContext
    {
        private readonly IHashService _hashService;

        public AppDbContext(DbContextOptions<AppDbContext> options, IHashService hashService) : base(options)
        {
            _hashService = hashService;

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<ClubPost> ClubPosts { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Reply> Replies { get; set; }
        public DbSet<Role> Roles { get; set; }

        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Department> Departments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<User>().HasQueryFilter(x => x.IsActive && !x.IsDeleted);
            modelBuilder.Entity<Post>().HasQueryFilter(x => !x.IsDeleted);
            modelBuilder.Entity<Reply>().HasQueryFilter(r => !r.Post.IsDeleted);
            modelBuilder.Entity<Club>().HasQueryFilter(c => !c.IsDeleted);
            modelBuilder.Entity<ClubPost>().HasQueryFilter(cp => !cp.IsDeleted);

            // Value converter for string[] to JSON
            var stringArrayConverter = new ValueConverter<string[], string>(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<string[]>(v));

            modelBuilder.Entity<ClubPost>()
                .Property(e => e.Images)
                .HasConversion(stringArrayConverter);

            modelBuilder.Entity<Post>()
                .Property(e => e.Images)
                .HasConversion(stringArrayConverter);

            modelBuilder.Entity<Role>().HasData(new List<Role>{
                new Role{
                    Id=1,
                    Title="SuperAdmin",
                },
                 new Role{
                    Id=2,
                    Title="ClubAdmin",

                },
                 new Role{
                    Id=3,
                    Title="User",
                }
            });

          

            modelBuilder.Entity<Faculty>().HasData(
                new List<Faculty>
                {
                new Faculty {
                    Title= "Mühendislik Fakültesi", Id= 1
                },
                new Faculty {
                    Title= "Tıp Fakültesi", Id= 2
                },
                new Faculty {
                    Title= "Hukuk Fakültesi", Id= 3
                },
                new Faculty {
                    Title= "İktisadi ve İdari Bilimler Fakültesi", Id= 4
                },
                new Faculty {
                    Title= "Fen Edebiyat Fakültesi", Id= 5
                },
                new Faculty {
                    Title= "Eğitim Fakültesi", Id= 6
                },
                new Faculty {
                    Title= "İletişim Fakültesi", Id= 7
                },
                }
                );


            modelBuilder.Entity<Department>().HasData(
                 new List<Department>
                 {
                     new Department { Id = 1, Name = "Bilgisayar Mühendisliği", FacultyId = 1 },
                     new Department { Id = 2, Name = "Elektrik-Elektronik Mühendisliği", FacultyId = 1 },
                     new Department { Id = 3, Name = "Makine Mühendisliği", FacultyId = 1 },
                     new Department { Id = 4, Name = "Tıp", FacultyId = 2 },
                     new Department { Id = 5, Name = "Hukuk", FacultyId = 3 },
                     new Department { Id = 6, Name = "İktisat", FacultyId = 4 },
                     new Department { Id = 7, Name = "İşletme", FacultyId = 4 },
                     new Department { Id = 8, Name = "Kimya", FacultyId = 5 },
                     new Department { Id = 9, Name = "Fizik", FacultyId = 5 },
                     new Department { Id = 10, Name = "Matematik", FacultyId = 5 },
                     new Department { Id = 11, Name = "Eğitim Bilimleri", FacultyId = 6 },
                     new Department { Id = 12, Name = "Rehberlik ve Psikolojik Danışmanlık", FacultyId = 6 },
                     new Department { Id = 13, Name = "Halkla İlişkiler ve Tanıtım", FacultyId = 7 },
                     new Department { Id = 14, Name = "Gazetecilik", FacultyId = 7 },
                 }
                 );

                  modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        Id = 9999,
                        UserName = "superadmin",
                        DisplayName = "superadmin",
                        Email = "superadmin@gmail.com",
                        Password = _hashService.HashPassword("123456SA."),
                        Biography = "",
                        ProfileImg = "",
                        RoleId = 1,
                        IsActive = true,
                        DepartmentId = 2,
                    }
                );




            var relationships = modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys());

            foreach (var relationship in relationships)
            {
                relationship.DeleteBehavior = DeleteBehavior.Cascade;
            }
            base.OnModelCreating(modelBuilder);
        }
    }
}
