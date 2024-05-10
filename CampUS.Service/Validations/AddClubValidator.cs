using FluentValidation;
using CampUS.DTO.Request.Club;

namespace CampUS.Service.Validations
{
    public class AddClubValidator : AbstractValidator<AddClubDto>
    {
        public AddClubValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(3, 100).WithMessage("Name must be between 3 and 100 characters long.");

            RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("Description cannot exceed 500 characters.");
            
            RuleFor(x => x.Password)
               .NotEmpty()
               .WithMessage("Password is required.")
               .MinimumLength(8)
               .WithMessage("Password must be at least 8 characters long.")
               .Matches("[A-Z]")
               .WithMessage("Password must contain at least one uppercase letter.")
               .Matches("[a-z]")
               .WithMessage("Password must contain at least one lowercase letter.")
               .Matches("[0-9]")
               .WithMessage("Password must contain at least one number.")
               .Matches("[^a-zA-Z0-9]")
               .WithMessage("Password must contain at least one special character.");

            RuleFor(x => x.ClubEmail)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("A valid email is required.");
        }
    }
}
