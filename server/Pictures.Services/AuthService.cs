
namespace Pictures.Services
{
    using AutoMapper.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.Extensions.Configuration;
    using System.Data;
    using Pictures.Core.Modals;
    using Pictures.Core.Reposetory;
    using Pictures.Core.Service;

    public class AuthService:IAuthService
    {
        private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
        private readonly IAuthReposetory _authReposetory;
        public AuthService(Microsoft.Extensions.Configuration.IConfiguration configuration, IAuthReposetory authReposetory)
        {
            _configuration = configuration;
            _authReposetory = authReposetory;
        }
        public async Task<User> GetUserByMail(string email)
        {
            return await _authReposetory.GetUserByMail(email);
        }

        public string GenerateJwtToken(string username, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role) // הוספת התפקיד היחיד כ-Claim

        };

            // הוספת תפקידים כ-Claims
            //foreach (var role in roles)
            //{
            //    claims.Add(new Claim(ClaimTypes.Role, role));
            //}

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
