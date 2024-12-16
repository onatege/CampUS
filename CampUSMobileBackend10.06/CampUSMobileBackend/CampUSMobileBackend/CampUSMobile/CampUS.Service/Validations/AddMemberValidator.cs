using FluentValidation;
using CampUS.DTO.Request.Club;

namespace CampUS.Service.Validations
{
    public class AddMemberValidator : AbstractValidator<AddClubMemberDto>
    {
        public AddMemberValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("Username is required.")
                .Matches(@"^\S*$").WithMessage("No white space allowed in username");
        }
    }
}
