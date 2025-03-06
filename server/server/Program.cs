using Pictures.Core;
using Pictures.Core.Reposetory;
using Pictures.Core.Service;
using Pictures.Data;
using Pictures.Data.Reposetories;
using Pictures.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IImageReposetory, ImageReposetory>();
builder.Services.AddScoped<IUserReposetory, UserReposeroty>();

builder.Services.AddDbContext<DataContext>();

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddCors();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
