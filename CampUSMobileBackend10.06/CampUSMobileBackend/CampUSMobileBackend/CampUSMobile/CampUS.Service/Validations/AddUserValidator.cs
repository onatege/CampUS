using FluentValidation;
using CampUS.DTO.Request.User;

namespace CampUS.Service.Validations
{
    public class AddUserValidator : AbstractValidator<AddUserDto>
	{
        public AddUserValidator()
        {
            RuleFor(x => x.UserName).NotNull()
                .WithMessage("{PropertyName} must not null!")
                .NotEmpty().WithMessage("{PropertyName} must not empty!")
                .MaximumLength(20);
            RuleFor(x => x.DisplayName).NotNull()
                .WithMessage("{PropertyName} must not null!")
                .NotEmpty().WithMessage("{PropertyName} must not empty!");
            RuleFor(x => x.Email).EmailAddress()
                .WithMessage("Invalid {PropertyName}, Please try again.")
                .NotNull()
                .WithMessage("{PropertyName} must not null.");
            RuleFor(x => x.Password).MinimumLength(8)
                .WithMessage("{PropertyName} too short.")
                .NotNull().NotEmpty();
            RuleFor(x => x.Biography).MaximumLength(20);
		}
    }
}
