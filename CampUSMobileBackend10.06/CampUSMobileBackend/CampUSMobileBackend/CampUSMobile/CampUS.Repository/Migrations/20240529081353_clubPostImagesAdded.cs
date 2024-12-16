using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampUS.Repository.Migrations
{
    /// <inheritdoc />
    public partial class clubPostImagesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Images",
                table: "ClubPosts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Images",
                table: "ClubPosts");
        }
    }
}
