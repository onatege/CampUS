using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CampUS.core.Abstracts;
using CampUS.Core.Models;
using Microsoft.IdentityModel.Tokens;
using Nest;

namespace CampUS.Service.Helpers{

    public class TokenService:ITokenService
    {
        public string GenerateToken(User user,int expireDate){
            var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role,user.Role.Title),
            new Claim("Id", user.Id.ToString())

        };
            SymmetricSecurityKey symmetricSecurityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes("socialmediasecretkey"));
            SigningCredentials signingCredentials=new SigningCredentials(symmetricSecurityKey,SecurityAlgorithms.HmacSha256);
            JwtSecurityToken token=new(
                issuer:"http//localhost",
                audience:"http//localhost",
                claims:claims,
                notBefore:DateTime.Now,
                signingCredentials:signingCredentials,
                expires:DateTime.Now.AddMinutes(expireDate));

            JwtSecurityTokenHandler handler=new ();
            return handler.WriteToken(token);
        }

        public string GetClaims(string token)
        {

            var decodedToken = new JwtSecurityToken(token);

            // Retrieve info from the Json Web Token 
         return decodedToken.Claims.First(c =>c.Type.Equals("exp")).Value;
        }

       
    }
}