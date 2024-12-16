namespace CampUS.Core.Abstracts{

    public interface IHashService{
        
        string HashPassword(string password);
         bool VerifyPassword(string password, string hash);
    }
}