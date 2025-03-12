using Microsoft.AspNetCore.Mvc;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
            var challenge =await _challengeService.GetCurrentChallengeAsync();
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
            return await _challengeService.UpdateActiveAsync(id);
        }

        //// DELETE api/<ChallengeController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
