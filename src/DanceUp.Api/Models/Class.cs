using System.ComponentModel.DataAnnotations.Schema;

namespace DanceUp.Api.Models
{
    public class Class
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("studio_id")]
        public int StudioId { get; set; }

        [Column("instructor_id")]
        public int InstructorId {get; set; }

        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("description")]
        public string Description { get; set; } = string.Empty;

        [Column("genre")]
        public string Genre { get; set; } = string.Empty;

        [Column("day")]
        public int Day { get; set; }

        [Column("start_time")]
        public DateTime StartTime { get; set; }

        [Column("end_time")]
        public DateTime EndTime { get; set; }

        [Column("capacity")]
        public int? Capacity { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }


        public Studio Studio { get; set; } = null!;
        public User Instructor { get; set; } = null!;
    }
}
