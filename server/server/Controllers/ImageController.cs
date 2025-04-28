using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Service;
using Pictures.Services;
using System;


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


        //שליפת כל התמונות
        [HttpGet]
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
        public async Task<ActionResult<Image>> GetImagesByChallenge(int ChallengeId)
        {
            var list= await _imageService.GetImagesByChallengeAsync(ChallengeId);
            return Ok(list);
        }


        //עדכון תמונה
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<bool>> PutAsync(int id, [FromBody] ImagePost image)
        {
            if (await _imageService.UpdateImageAsync(id, image))
            {
                return Ok(true);
            }
            return BadRequest(false);
        }


        //מחיקת תמונה
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
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
