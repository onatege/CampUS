using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using CampUS.Core.Abstracts;
using CampUS.Core.Interfaces;
using CampUS.DTO.Response;

namespace CampUS.Service.Filters
{
	public class NotFoundFilter<T> : IAsyncActionFilter where T : class,IBaseEntity
	{
		private readonly IService<T> _service;
        public NotFoundFilter(IService<T> service)
        {
			_service = service;
		}
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
		{
			var idValues = context.ActionArguments.Values.FirstOrDefault();
			if (idValues == null)
			{
				await next.Invoke();
				return;
			}

			var id = (int)idValues;
			var entity = await _service.AnyAsync(x => x.Id == id);
			if (entity)
			{
				await next.Invoke();
				return;
			};

			context.Result = new NotFoundObjectResult(CustomResponseDto.Fail($"{typeof(T).Name}Id:{id} not found", HttpStatusCode.NotFound));

		}
	}
}
