using Microsoft.AspNetCore.Mvc;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pictures.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {

        private readonly IVoteService _IvoteService;
        private readonly IImageService _IImageService;
        public VoteController(IVoteService IvoteService, IImageService IImageService)
        {
            _IvoteService = IvoteService;
            _IImageService = IImageService;
        }
        // שליפת כל ההצבעות לאתגר מסוים
        //[HttpGet("{challengeId}")]
        //public async Task<ActionResult<Vote> Get(int challengeId)
        //{
        //    var list= await 
        //}

        // GET api/<VoteController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //הוספת הצבעה
        [HttpPost]
        public async Task<ActionResult<bool>> AddVote([FromBody] VotePost vote)
        {
            if(await _IvoteService.AddVote(vote))
            {
                //הוספת הצבעה לתמונה
                await _IImageService.UpdateImageVoteAsync(vote.ImageId);
                return Ok(true);
            }
            return BadRequest(false);
        }

        // PUT api/<VoteController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<VoteController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
