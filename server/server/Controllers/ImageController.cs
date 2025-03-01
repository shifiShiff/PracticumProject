using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pictures.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        //[HttpGet("api/images")]
        //public async Task<IActionResult> GetAllImages([FromServices] AppDbContext context)
        //{
        //    var images = await context.Images.Include(i => i.User).ToListAsync();
        //    return Ok(images);
        //}

        //[HttpGet("api/images/top")]
        //public async Task<IActionResult> GetTopImage([FromServices] AppDbContext context)
        //{
        //    var topImage = await context.Images.OrderByDescending(i => i.Votes).FirstOrDefaultAsync();
        //    if (topImage == null) return NotFound("No images found.");
        //    return Ok(topImage);
        //}


    }
}
