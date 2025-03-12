using Microsoft.AspNetCore.Mvc;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Pictures.Core.Modals;
using Pictures.Core.DTOs;
using Pictures.Core.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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

    

        //[HttpGet("presigned-url")]
        //public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        //{
        //    var request = new GetPreSignedUrlRequest
        //    {
        //        BucketName = "your-bucket-name",//??????????????????
        //        Key = fileName,
        //        Verb = HttpVerb.PUT,
        //        Expires = DateTime.Now.AddMinutes(5),
        //        ContentType = "image/jpeg" // או סוג הקובץ המתאים
        //    };

        //    string url = _s3Client.GetPreSignedURL(request);
        //    return Ok(new { url });
        //}

        //[HttpPost("upload-file")]
        //public async Task<IActionResult> UploadFile(IFormFile file)


        [HttpPost("upload-file/{userId}/{challengeId}")]
        public async Task<IActionResult> UploadFile(int userId, int challengeId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            

            // יצירת שם ייחודי לקובץ ב-S3 (אפשר להשתמש גם במזהה UUID או ID של תמונה)
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            // יצירת בקשה להעלאת קובץ ל-S3
            var putRequest = new PutObjectRequest
            {

                BucketName = "phototop",  // שם ה-Bucket שלך
                Key = fileName,
                InputStream = file.OpenReadStream(),
                ContentType = file.ContentType
            };

            // העלאת הקובץ ל-S3
            var response = await _s3Client.PutObjectAsync(putRequest);
      

            //העלאת הקובץ ל - S3

            if (response.HttpStatusCode != System.Net.HttpStatusCode.OK)
                return StatusCode((int)response.HttpStatusCode, "Error uploading file to S3.");

            // יצירת אובייקט חדש ב-DB עם ה-URL של הקובץ
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


        // אפשרות לקבלת URL פרסיינד להעלאת קובץ
        //[HttpGet("presigned-url")]
        //public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        //{
        //    var request = new GetPreSignedUrlRequest
        //    {
        //        BucketName = "phototop", // שם ה-Bucket שלך
        //        Key = fileName,
        //        Verb = HttpVerb.PUT,
        //        Expires = DateTime.Now.AddMinutes(5),
        //        ContentType = "image/jpeg"  // סוג הקובץ (תוכל לשנות אותו לפי הצורך)
        //    };

        //    string url = _s3Client.GetPreSignedURL(request);
        //    return Ok(new { url });
        //}
    }
}
