using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CampUS.Core.Models;

namespace CampUS.Repository.Configurations
{
    public class ClubPostConfiguration : IEntityTypeConfiguration<ClubPost>
    {
        public void Configure(EntityTypeBuilder<ClubPost> builder)
        {
            builder.HasKey(cp => cp.Id);
            builder.Property(cp => cp.Id).UseIdentityColumn();
            builder.Property(cp => cp.Content).IsRequired().HasMaxLength(1000);

            builder.ToTable("ClubPosts");

            // Relationship to Club
            builder.HasOne(cp => cp.Club)
                   .WithMany(c => c.ClubPosts)
                   .HasForeignKey(cp => cp.ClubId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
