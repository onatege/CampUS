
namespace CampUS.Core.Models
{

    public class Faculty
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public ICollection<Department> Departments { get; set; }

    }
}