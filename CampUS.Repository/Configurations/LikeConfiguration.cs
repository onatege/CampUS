using CampUS.Core.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class LikeConfiguration : IEntityTypeConfiguration<Like>
{
    public void Configure(EntityTypeBuilder<Like> builder)
    {
        builder.ToTable("Likes");

        // Define composite primary key
        builder.HasKey(x => new { x.PostId, x.UserId });

        builder.HasOne(x => x.User)
            .WithMany(y => y.Likes) 
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade); // No cascading delete

        builder.HasOne(x => x.Post)
            .WithMany(y => y.Likes) 
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.Cascade); // No cascading delete
    }
}
