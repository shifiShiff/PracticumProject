using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Service;


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

        //הוספת הצבעה
        [HttpPost]
        [Authorize(Roles = "User")]
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

    }
}
