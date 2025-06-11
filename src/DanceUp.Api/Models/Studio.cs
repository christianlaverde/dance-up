using System.ComponentModel.DataAnnotations.Schema;

namespace DanceUp.Api.Models
{
   public class Studio
   {
       [Column("id")]
       public int Id { get; set; }

       [Column("owner_id")]
       public int OwnerId { get; set; }

       [Column("name")]
       public string Name { get; set; } = string.Empty;

       [Column("created_at")]
       public DateTime CreatedAt { get; set; }

       [Column("updated_at")]
       public DateTime UpdatedAt { get; set; }

       public User Owner { get; set; } = null!;
       public ICollection<User> Users { get; set; } = new List<User>();
       public ICollection<Class> Classes { get; set; } = new List<Class>();
   }
}
