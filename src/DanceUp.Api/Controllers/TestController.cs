using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceUp.Api.Data;

namespace DanceUp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TestController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/test/ping
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok(new { message = "API is working!", timestamp = DateTime.Now });
        }

        // GET: api/test/database
        [HttpGet("database")]
        public async Task<IActionResult> TestDatabase()
        {
            try
            {
                // Test basic connection
                var canConnect = await _context.Database.CanConnectAsync();
                if (!canConnect)
                {
                    return Ok(new { status = "Failed", message = "Cannot connect to database" });
                }

                // Get counts from each table
                var userCount = await _context.Users.CountAsync();
                var studioCount = await _context.Studios.CountAsync();
                var classCount = await _context.Classes.CountAsync();

                return Ok(new 
                { 
                    status = "Success",
                    message = "Database connection working",
                    counts = new
                    {
                        users = userCount,
                        studios = studioCount,
                        classes = classCount
                    }
                });
            }
            catch (Exception ex)
            {
                return Ok(new 
                { 
                    status = "Error",
                    message = ex.Message,
                    innerException = ex.InnerException?.Message
                });
            }
        }

        [HttpGet("debug-simple")]
        public ActionResult<IEnumerable<string>> TestSimpleArray()
        {
            var l = new List<string> {"test1", "test2", "test3"};
            return l;
        }

        [HttpGet("debug-objects")]
        public ActionResult<IEnumerable<object>> TestSimpleObjects()
        {
            var objects = new List<object> 
            { 
                new { id = 1, name = "test1" },
                new { id = 2, name = "test2" }
            };
            return objects;
        } 
    }
}
