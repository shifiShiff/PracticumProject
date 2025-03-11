using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pictures.Core.Modals;
using Pictures.Core.Service;
using Pictures.Services;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    //[HttpPost("login")]
    //public IActionResult Login([FromBody] LoginModel model)
    //{
    //    // כאן יש לבדוק את שם המשתמש והסיסמה מול מסד הנתונים
    //    if (model.UserName == "admin" && model.Password == "admin123")
    //    {
    //        var token = _authService.GenerateJwtToken(model.UserName, new[] { "Admin" });
    //        return Ok(new { Token = token });
    //    }
    //    else if (model.UserName == "editor" && model.Password == "editor123")
    //    {
    //        var token = _authService.GenerateJwtToken(model.UserName, new[] { "Editor" });
    //        return Ok(new { Token = token });
    //    }
    //    else if (model.UserName == "viewer" && model.Password == "viewer123")
    //    {
    //        var token = _authService.GenerateJwtToken(model.UserName, new[] { "Viewer" });
    //        return Ok(new { Token = token });
    //    }

    //    return Unauthorized();
    //}
    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _authService.GetUserByMail(model.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
            return Unauthorized();


        var token = _authService.GenerateJwtToken(user.Email, user.Role);
        return Ok(new { Token = token });
    }

}


