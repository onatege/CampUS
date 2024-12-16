using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CampUS.Core.Models;

namespace CampUS.Repository.Configurations
{
    public class LikeConfiguration : IEntityTypeConfiguration<Like>
    {
        public void Configure(EntityTypeBuilder<Like> builder)
        {
            builder.HasKey(x => new { x.PostId, x.UserId });

            builder.ToTable("Likes");

            builder.HasOne(x => x.User)
           .WithMany(y => y.Likes)
           .HasForeignKey(x => x.UserId)
           .OnDelete(DeleteBehavior.Cascade); // No cascading delete

            builder.HasOne(x => x.Post)
           .WithMany(y => y.Likes)
           .HasForeignKey(x => x.PostId)
           .OnDelete(DeleteBehavior.Cascade); // No cascading delete


            /*builder.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Post)
                .WithMany()
                .HasForeignKey(x => x.PostId)
                .OnDelete(DeleteBehavior.Restrict);
            */
        }
    }
}
