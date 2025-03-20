using AutoMapper;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using Pictures.Core.DTOs;
using Pictures.Core.Modals;
using Pictures.Core.Reposetory;
using Pictures.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Services
{
    public class ChallengeService:IChallengeService
    {

        private readonly IChallengeReposetory _challengeReposetory;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public ChallengeService(IChallengeReposetory challengeReposetory,IMapper mapper, IConfiguration config)
        {
            _challengeReposetory = challengeReposetory;
            _mapper = mapper;
            _config = config;
        }

        public async Task<List<Challenge>> GetAllChallengesAsync()
        {
            return await _challengeReposetory.GetAllChallengesAsync();
        }

        public Task<Challenge> GetChallengeById(int id)
        {
            return _challengeReposetory.GetChallengeById(id);
        }

        public async Task<int> GetCurrentChallengeAsync()
        {
            return await _challengeReposetory.GetCurrentChallengeAsync();
        }

        public async Task<User> GetUserDetailByChallengeAsync(int challengeId)
        {
            return await _challengeReposetory.GetUserDetailByChallengeAsync(challengeId);
        }

        public async Task<List<ChallengeVoteDto>> GetVotePerCahllengeAsync()
        {
            return await _challengeReposetory.GetVotePerCahllengeAsync();
        }

        public async Task<bool> PostAsync(ChallengePost challenge)
        {
            var tmp =_mapper.Map<Challenge>(challenge);
            tmp.Active = true;
            return await _challengeReposetory.PostAsync(tmp);
        }

        public async Task<string> UpdateActiveAsync(int id)
        {
            return await _challengeReposetory.UpdateActiveAsync(id);
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("PhotoTop", _config["EmailSettings:Username"]));
            email.To.Add(new MailboxAddress("", toEmail));
            email.Subject = subject;
            email.Body = new TextPart("plain") { Text = body };

            //using var smtp = new SmtpClient();
            //await smtp.ConnectAsync(_config["EmailSettings:SmtpServer"], int.Parse(_config["EmailSettings:Port"]), SecureSocketOptions.StartTls);
            //await smtp.AuthenticateAsync(_config["EmailSettings:Username"], _config["EmailSettings:Password"]);
            //await smtp.SendAsync(email);
            //await smtp.DisconnectAsync(true);

            using var smtp = new MailKit.Net.Smtp.SmtpClient(); // לוודא שזה מ-MailKit
            await smtp.ConnectAsync(_config["EmailSettings:SmtpServer"], int.Parse(_config["EmailSettings:Port"]), SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_config["EmailSettings:Username"], _config["EmailSettings:Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
