using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pictures.Data.Migrations
{
    /// <inheritdoc />
    public partial class _123_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
       name: "UpdatedAt",
       table: "Challenges");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
