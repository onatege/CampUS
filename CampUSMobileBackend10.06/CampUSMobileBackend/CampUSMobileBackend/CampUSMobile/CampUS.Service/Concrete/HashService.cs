using System.Security.Cryptography;
using System.Text;
using CampUS.Core.Abstracts;

namespace CampUS.Service.Concrete{

    public class HashService : IHashService
    {
        public string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
        {
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }
        }

        public bool VerifyPassword(string password, string hash)
        {
           string hashOfInput = HashPassword(password);

            return StringComparer.OrdinalIgnoreCase.Compare(hashOfInput, hash) == 0;
        }
    }

}