using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampUS.Repository.Migrations
{
    /// <inheritdoc />
    public partial class afterSuperAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Biography", "CreatedAt", "DeletedAt", "DepartmentId", "DisplayName", "Email", "IsActive", "IsDeleted", "Password", "ProfileImg", "RoleId", "UpdatedAt", "UserName" },
                values: new object[] { 9999, "", null, null, null, "superadmin", "superadmin@gmail.com", true, false, "a0e08cdfbcd9f563e13e308fd4942de91afad099c8991bbf6d0eba0e37ea43e9", "", 1, null, "superadmin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9999);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Biography", "CreatedAt", "DeletedAt", "DepartmentId", "DisplayName", "Email", "IsActive", "IsDeleted", "Password", "ProfileImg", "RoleId", "UpdatedAt", "UserName" },
                values: new object[] { 1, "", null, null, null, "superadmin", "superadmin@gmail.com", true, false, "a0e08cdfbcd9f563e13e308fd4942de91afad099c8991bbf6d0eba0e37ea43e9", "", 1, null, "superadmin" });
        }
    }
}
