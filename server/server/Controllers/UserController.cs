using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Service;
using Pictures.Services;


namespace Pictures.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        //שליפת כל משתמשים
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> GetAllUsersAsync()
        {
            var userList = await _userService.GetAllUsersAsync();
            return Ok(userList);
        }

        // שליפת נתוני משתמש ע"פ ID 
        [HttpGet("{id}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<User>> GetUserByIdAsync(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound("No user with id " + id);
            }
            return Ok(user);
        }


        // שליפת כתובת מייל של משתמש ע"פ ID 
        [HttpGet("userEmail/{id}")]
        [Authorize(Roles = "User")] 
        public async Task<ActionResult<string>> GetUserEmailByIdAsync(string id)
        {
            var user =await _userService.GetUserByIdAsync(id);
            if(user == null)
            {
                 return NotFound("No user with id " + id);
            }
            return Ok(user.Email);
        }

        // הוספת משתמש חדש
        [HttpPost("register")]
        public async Task<ActionResult<string>> PostAsync([FromBody] UserPost user)
        {
            var tmpuser = await _userService.AddUserAsync(user);
            if (tmpuser != null)
            {
                var token = _userService.GenerateJwtToken(user.Email, "User");
                return Ok(new { Token = token, userId = tmpuser.Id });
            }
            
            return BadRequest(false);

        }

        //כניסה למשתמש מחובר
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userService.GetUserByMail(model.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                return Unauthorized();


            var token = _userService.GenerateJwtToken(user.Email, user.Role);
            return Ok(new { Token = token ,userId=user.Id});
        }


        // עדכון משתמש
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutAsync(string id, [FromBody] UserPost user)
        {
            if (await _userService.UpdateUserAsync(id, user))
            {
                return Ok(true);
            }
            return BadRequest(false);

        }

        // מחיקת משתמש
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteUserAsync(string id)
        {
            if(await _userService.DeleteUserAsync(id))
            {
                return Ok(true);
            }
            return BadRequest(true);

        }
    }
}
