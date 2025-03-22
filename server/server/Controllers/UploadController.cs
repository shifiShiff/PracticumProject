using Microsoft.AspNetCore.Mvc;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Pictures.Core.Modals;
using Pictures.Core.DTOs;
using Pictures.Core.Service;
using Microsoft.AspNetCore.Authorization;


namespace Pictures.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;        
        private readonly IImageService _imageService;


        public UploadController(IAmazonS3 s3Client, IImageService imageService)
        {
            _s3Client = s3Client;
            _imageService = imageService;
            
        }

    

        [HttpPost("upload-file/{userId}/{challengeId}")]
        [Authorize(Roles = "User")]

        public async Task<IActionResult> UploadFile(int userId, int challengeId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            var putRequest = new PutObjectRequest
            {
                BucketName = "phototop", 
                Key = fileName,
                InputStream = file.OpenReadStream(),
                ContentType = file.ContentType
            };

            var response = await _s3Client.PutObjectAsync(putRequest);
      
            if (response.HttpStatusCode != System.Net.HttpStatusCode.OK)
                return StatusCode((int)response.HttpStatusCode, "Error uploading file to S3.");

            var image = new Image
            {
                FileName = fileName,
                UserId = userId,
                ChallengeId = challengeId,
                ImageUrl = $"https://{putRequest.BucketName}.s3.amazonaws.com/{fileName}",
                UploadedAt = DateTime.Now
            };

            
            await _imageService.AddImageAsync(image);

            return Ok(new { ImageUrl = image.ImageUrl });
        }
    }
}
