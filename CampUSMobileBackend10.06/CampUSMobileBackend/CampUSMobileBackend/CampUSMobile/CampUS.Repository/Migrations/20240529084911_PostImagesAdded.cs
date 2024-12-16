using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampUS.Repository.Migrations
{
    /// <inheritdoc />
    public partial class PostImagesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Posts",
                newName: "Images");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Images",
                table: "Posts",
                newName: "Image");
        }
    }
}
