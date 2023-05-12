using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using VotingAppSignalRandReact.Hubs;

namespace VotingAppSignalRandReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult SurveyQuiz()
        {
            var poll = new
            {
                question = "Which is your favourite fruit?",
                choices = VotingHub.poll.Select(x => new { name = x.Key, count = x.Value }).ToList()
            };

            _logger.LogInformation("HomeController.SurveyQuiz() called");
            return new JsonResult(poll);
        }
    }
}