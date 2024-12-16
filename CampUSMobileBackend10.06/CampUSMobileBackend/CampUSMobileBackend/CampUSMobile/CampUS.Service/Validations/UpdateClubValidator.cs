using FluentValidation;
using CampUS.DTO.Request.Club;

namespace CampUS.Service.Validations
{
    public class UpdateClubValidator : AbstractValidator<UpdateClubDto>
    {
        public UpdateClubValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(3, 100).WithMessage("Name must be between 3 and 100 characters long.");

            RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("Description cannot exceed 500 characters.");
        }
    }
}
