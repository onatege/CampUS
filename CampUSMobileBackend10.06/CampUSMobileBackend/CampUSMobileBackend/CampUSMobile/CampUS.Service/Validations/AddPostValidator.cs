using FluentValidation;
using CampUS.DTO.Request.Post;

namespace CampUS.Service.Validations
{
    public class AddPostValidator : AbstractValidator<AddPostDto>
	{
		public AddPostValidator()
		{
			RuleFor(x => x.Content).NotNull().WithMessage("{propertyName} must not null!").NotEmpty().WithMessage("{propertyName} must not empty!").MaximumLength(240);
		}
	}
}
