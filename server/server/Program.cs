using Pictures.Core;
using Pictures.Core.Reposetory;
using Pictures.Core.Service;
using Pictures.Data;
using Pictures.Data.Reposetories;
using Pictures.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

using Amazon.S3;

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
builder.Services.AddScoped<IAuthService,AuthService>();
builder.Services.AddScoped<IAuthReposetory,AuthReposetory>();
builder.Services.AddScoped<IChallengeService,ChallengeService>();
builder.Services.AddScoped<IChallengeReposetory, ChallengeReposetory>();
builder.Services.AddScoped<IVoteService, VoteService>();
builder.Services.AddScoped<IVoteReposetory, VoteReposetory>();

builder.Services.AddDbContext<DataContext>();


//builder.Services.AddSingleton<IAmazonS3, AmazonS3Client>();
var awsOptions = builder.Configuration.GetSection("AWS");
builder.Services.AddSingleton<IAmazonS3>(sp =>
    new AmazonS3Client(
        awsOptions["AccessKey"],
        awsOptions["SecretKey"],
        new AmazonS3Config { RegionEndpoint = Amazon.RegionEndpoint.GetBySystemName(awsOptions["Region"]) }
    ));


builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddCors();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"


    };
});



//קשור לSWAGGER לJWT
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "הכנס את ה-Token בפורמט: Bearer {token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

//הרשאות
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});


var app = builder.Build();



app.UseCors("AllowAll"); // חייב להיות לפני app.UseAuthorization()

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication(); // ?? קודם Authentication

app.UseAuthorization();

app.MapControllers();

app.Run();
