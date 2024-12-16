using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CampUS.Core.Models;

namespace CampUS.Repository.Configurations
{
	public class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Id).UseIdentityColumn();
			builder.Property(x => x.UserName).IsRequired().HasMaxLength(50);
            builder.HasIndex(x => x.UserName).IsUnique();
            builder.Property(x => x.Email).IsRequired().HasMaxLength(50);
			builder.HasIndex(x => x.Email).IsUnique();
			builder.Property(x => x.Password).IsRequired();
			builder.Property(x => x.Biography).HasMaxLength(30);
			builder.ToTable("Users");
            //.HasIndex, belirli bir sutuna ozellik eklememizi saglar.
        }
    }
}
