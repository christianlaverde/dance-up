using System.ComponentModel.DataAnnotations.Schema;

namespace DanceUp.Api.Models
{
    public class User
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("role")]
        public string Role { get; set; } = "member";

        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Column("first_name")]
        public string FirstName { get; set; } = string.Empty;

        [Column("middle_name")]
        public string? MiddleName { get; set; } = string.Empty;

        [Column("last_name")]
        public string LastName { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        public ICollection<Studio> OwnedStudios { get; set; } = new List<Studio>();
        public ICollection<Studio> Studios { get; set; } = new List<Studio>();
        public ICollection<Class> InstructedClasses { get; set;} = new List<Class>();
    }
}
