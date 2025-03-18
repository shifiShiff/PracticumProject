using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Service;
using Pictures.Services;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pictures.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {

        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }
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

        //שליפת כל התמונות
        [HttpGet]
        //[Authorize(Roles = "User")]

        public async Task<ActionResult<Image>> GetAllImagesAsync()
        {
            var ImageList = await _imageService.GetAllImagesAsync();
            return Ok(ImageList);
        }

        //שליפת התמונה הזוכה לפי אתגר
        [HttpGet("TopImage{ChallengeId}")]
        public async Task<ActionResult<Image>> GetTopImageAsync(int ChallengeId)
        {
            return await _imageService.GetTopImageAsync(ChallengeId);
        }

        //שליפת רשימת תמונות לפי אתגר
        [HttpGet("{ChallengeId}")]
        //[Authorize(Roles = "User")]
        public async Task<ActionResult<Image>> GetImagesByChallenge(int ChallengeId)
        {
            var list= await _imageService.GetImagesByChallengeAsync(ChallengeId);
            return Ok(list);
        }

        //הוספת תמונה
      
        //[HttpPost]
        //public async Task<ActionResult<bool>> PostAsync([FromBody] ImagePost image)
        //{
        //    if (await _imageService.AddImageAsync(image))
        //        return Ok(true);
        //    return BadRequest(false);
        //}


        //עדכון תמונה
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutAsync(int id, [FromBody] ImagePost image)
        {
            if (await _imageService.UpdateImageAsync(id, image))
            {
                return Ok(true);
            }
            return BadRequest(false);
        }


        //עדכון מספר ההצבעות
        //[HttpPut("Increase/{id}")]
        //public async Task<ActionResult<bool>> PutVotesAsync(int id)
        //{
        //    if (await _imageService.UpdateImageVoteAsync(id))
        //    {
        //        return Ok(true);
        //    }
        //    return BadRequest(false);
        //}


        //מחיקת תמונה
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteImageAsync(int id)
        {
            if (await _imageService.DeleteImageAsync(id))
            {
                return Ok(true);
            }
            return BadRequest(true);

        }

    }
}
