using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CampUS.Core.Models;

namespace CampUS.Repository.Configurations
{
	public class ReplyConfiguration : IEntityTypeConfiguration<Reply>
	{
		public void Configure(EntityTypeBuilder<Reply> builder)
		{
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Content).IsRequired().HasMaxLength(280);
            builder.ToTable("Replies");

            /*
            builder.HasOne(r => r.Post)
                .WithMany()
                .HasForeignKey(r => r.PostId)
                .OnDelete(DeleteBehavior.Restrict);
            */
        }
    }
}
