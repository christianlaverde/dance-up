using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceUp.Api.Data;
using DanceUp.Api.Models;

namespace DanceUp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudiosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudiosController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/studios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudioSummaryDto>>> GetAllStudios()
        {
            var studios = await _context.Studios
                .Include(s => s.Owner)
                .OrderBy(s => s.Name)
                .ToListAsync();

            var studioSummaries = studios.Select(s => new StudioSummaryDto
                    {
                        Id = s.Id,
                        Name = s.Name,
                        OwnerName = $"{s.Owner.FirstName} {s.Owner.LastName}"
                    }).ToList();

            return Ok(studioSummaries.ToArray());
        }

        // GET /api/studios/{studio-id}
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudioSummaryDto>>> GetStudio(int id)
        {
            var studio = await _context.Studios
                .Include(s => s.Owner)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (studio == null)
            {
                return NotFound($"Studio with id {id} not found.");
            }

            var studioSummary = new StudioSummaryDto
            {
                Id = studio.Id,
                Name = studio.Name,
                OwnerName = $"{studio.Owner.FirstName} {studio.Owner.LastName}"
            };

            return Ok(studioSummary);
        }
    }
}

public class StudioSummaryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string OwnerName { get; set;} = string.Empty;
}
