using Microsoft.AspNetCore.Authorization;
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


        //שליפת פרטי אתגר ע"י ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Challenge>> GetChallengeById(int id)
        {
            return await _challengeService.GetChallengeById(id);
        }


        //קבלת רשימת אתגרים עם כמות הצבעות לכל אתגר
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<ChallengeVote>>> GetVotePerCahllengeAsync()
        {
            return await _challengeService.GetVotePerCahllengeAsync();
        }


        [HttpGet("allChallenges")]
        public async Task<ActionResult<List<Challenge>>> GetAllChallengesAsync()
        {
            return await _challengeService.GetAllChallengesAsync();
        }


        //קבלת פרטי מנצח של אתגר ע"י CHALLEGEID
        [HttpGet("{challengeId}/winner")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> GetUserDetailByChallengeAsync(int challengeId)
        {
            return await _challengeService.GetUserDetailByChallengeAsync(challengeId);
        }

        //הוספת אתגר
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<bool>> PostAsync([FromBody] ChallengePost challenge)
        {
            return await _challengeService.PostAsync(challenge);
        }

        //סגירת אתגר ושליחת מייל לזוכה המאושר
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
