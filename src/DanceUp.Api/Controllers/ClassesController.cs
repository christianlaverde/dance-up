using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceUp.Api.Data;
using DanceUp.Api.Models;

namespace DanceUp.Api.Controllers
{
    [ApiController]
    [Route("api/studios/{studioId}/classes")]
    public class ClassesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClassesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /api/studios/{studioId}/classes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Class>>> GetClasses(int studioId)
        {
            var studioExists = await _context.Studios.AnyAsync(s => s.Id == studioId);
            if (!studioExists)
            {
                return NotFound($"Studio with ID {studioId} not found.");
            }

            var classes = await _context.Classes
                .Where(c => c.StudioId == studioId)
                .ToListAsync();

            // return Ok(classes);
            return classes;
        }
    }
}
