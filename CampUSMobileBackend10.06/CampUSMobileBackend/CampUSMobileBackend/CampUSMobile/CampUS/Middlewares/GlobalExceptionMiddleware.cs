using System.Net;
using System.Text.Json;
using CampUS.DTO.Response;
using CampUS.Service.Exceptions;

namespace CampUS.Middlewares
{
	public class GlobalExceptionMiddleware
	{
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
			_next = next;
			_logger = logger;
		}

		public async Task Invoke(HttpContext context)
		{
			try
			{
				await _next.Invoke(context);
			}
			catch (Exception err)
			{
				var response = context.Response;
				response.ContentType = "application/json";
				
				HttpStatusCode statusCode;
				switch (err)
				{
					case ClientSideException ex:
						statusCode = HttpStatusCode.BadRequest;

						break;
					case NotFoundException ex:
						statusCode = HttpStatusCode.NotFound;
						
						break;
					default:
						statusCode = HttpStatusCode.InternalServerError;
						break;
				}

				response.StatusCode = (int)statusCode;

				var result = CustomResponseDto.Fail(err.Message, statusCode);
				await response.WriteAsync(JsonSerializer.Serialize(result));
				_logger.LogError($"ERROR: {err.Message}");
			}
		} 
    }
}
