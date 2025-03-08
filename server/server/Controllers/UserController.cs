using Microsoft.AspNetCore.Mvc;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        public async Task<ActionResult<User>> GetAllUsersAsync()
        {
            var userList = await _userService.GetAllUsersAsync();
            return Ok(userList);
        }

        // שליפת נתוני משתמש ע"פ ID 
        [HttpGet("{id}")]
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
        [HttpPost]
        public async Task<ActionResult<bool>> PostAsync([FromBody] UserPost user)
        {
            if (await _userService.AddUserAsync(user))
            {
                
                return Ok(true);
            }
            return BadRequest(false);

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
