using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CampUS.Core.Models;

namespace CampUS.Repository.Configurations
{
    public class ClubConfiguration : IEntityTypeConfiguration<Club>
    {
        public void Configure(EntityTypeBuilder<Club> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id).UseIdentityColumn();
            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(c => c.Description)
                .HasMaxLength(500);
            builder.Property(c => c.ProfileImg)
                .HasMaxLength(255);
            builder.Property(c => c.ClubEmail)
                .IsRequired()
                .HasMaxLength(100);
            builder.HasIndex(c => c.ClubEmail).IsUnique();  // Ensure email is unique among clubs
            builder.Property(c => c.Password)
                .IsRequired()
                .HasMaxLength(100);

            builder.ToTable("Clubs");

            // Configure one-to-many relationship with ClubPost
            builder.HasMany(c => c.ClubPosts)
                   .WithOne(p => p.Club)
                   .HasForeignKey(p => p.ClubId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Configure many-to-many relationship with Users as Members
            builder.HasMany(c => c.Members)
                   .WithMany(u => u.Clubs);

            builder.Property(c => c.IsDeleted).HasDefaultValue(false);
        }
    }
}
