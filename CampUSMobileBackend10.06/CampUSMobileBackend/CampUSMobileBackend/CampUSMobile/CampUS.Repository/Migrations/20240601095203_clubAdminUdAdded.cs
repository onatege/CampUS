using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampUS.Repository.Migrations
{
    /// <inheritdoc />
    public partial class clubAdminUdAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClubAdminId",
                table: "Clubs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClubAdminId",
                table: "Clubs");
        }
    }
}
