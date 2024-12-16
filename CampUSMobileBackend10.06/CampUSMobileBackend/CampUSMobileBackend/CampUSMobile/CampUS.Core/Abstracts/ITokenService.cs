using CampUS.Core.Models;
using System.Security.Claims;

namespace CampUS.core.Abstracts{

    public interface ITokenService{
        string  GenerateToken(User user,int expireDate);
        string GetClaims(string token);
    }
}