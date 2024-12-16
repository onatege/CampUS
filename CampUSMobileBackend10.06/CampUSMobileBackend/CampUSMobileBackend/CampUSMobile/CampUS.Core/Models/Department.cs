namespace CampUS.Core.Models
{
    public class Department
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }
        public ICollection<User> Users { get; set; }

    }
}