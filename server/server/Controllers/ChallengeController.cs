using Microsoft.AspNetCore.Mvc;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Service;


namespace Pictures.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChallengeController : ControllerBase
    {
        private readonly IChallengeService _challengeService;
        public ChallengeController(IChallengeService challengeService)
        {
            _challengeService = challengeService;
        }

        //שליפת האתגר הנוכחי
        [HttpGet("current")]
        public async Task<ActionResult<int>> GetCurrentChallengeAsync()
        {
            var challenge = await _challengeService.GetCurrentChallengeAsync();
            if (challenge != 0)
            {
                return Ok(challenge);
            }
            return BadRequest(false);
        }

        //GET api/<ChallengeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Challenge>> GetChallengeById(int id)
        {
            return await _challengeService.GetChallengeById(id);
        }

        [HttpGet]
        public async Task<ActionResult<List<ChallengeVoteDto>>> GetVotePerCahllengeAsync()
        {
            return await _challengeService.GetVotePerCahllengeAsync();
        }

        [HttpGet("allChallenges")]
        public async Task<ActionResult<List<Challenge>>> GetAllChallengesAsync()
        {
            return await _challengeService.GetAllChallengesAsync();
        }


        [HttpGet("{challengeId}/winner")]
        public async Task<ActionResult<User>> GetUserDetailByChallengeAsync(int challengeId)
        {
            return await _challengeService.GetUserDetailByChallengeAsync(challengeId);
        }

        //POST api/<ChallengeController>
        [HttpPost]
        public async Task<ActionResult<bool>> PostAsync([FromBody] ChallengePost challenge)
        {
            return await _challengeService.PostAsync(challenge);
        }

        // PUT api/<ChallengeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id)
        {
            var res = await _challengeService.UpdateActiveAsync(id);
            if (res != "")
            {
                await _challengeService.SendEmailAsync(res, "Congratulations🥳", "Hi! we are happy to tell you that your image got the max count of votes \n You are the winner in this challenge!");
                return Ok(true);
            }
            return BadRequest(false);

        }

    }
}
