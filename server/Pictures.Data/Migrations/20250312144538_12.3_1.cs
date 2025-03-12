using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pictures.Data.Migrations
{
    /// <inheritdoc />
    public partial class _123_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "Challenges",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Active = table.Column<bool>(type: "bit", nullable: false),
            //        WinnerId = table.Column<int>(type: "int", nullable: false),
            //        WinnerImageId = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Challenges", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Images",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        UserId = table.Column<int>(type: "int", nullable: false),
            //        ChallengeId = table.Column<int>(type: "int", nullable: false),
            //        ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Votes = table.Column<int>(type: "int", nullable: false),
            //        UploadedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Images", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Users",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Users", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Votes",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        UserId = table.Column<int>(type: "int", nullable: false),
            //        ChallengeId = table.Column<int>(type: "int", nullable: false),
            //        ImageId = table.Column<int>(type: "int", nullable: false),
                //    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                //},
                //constraints: table =>
                //{
                //    table.PrimaryKey("PK_Votes", x => x.Id);
                //});
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "Challenges");

            //migrationBuilder.DropTable(
            //    name: "Images");

            //migrationBuilder.DropTable(
            //    name: "Users");

            //migrationBuilder.DropTable(
            //    name: "Votes");
        }
    }
}
