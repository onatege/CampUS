using Microsoft.IO;
using System.Text;
using CampUS.Service.Exceptions;

namespace CampUS.Middlewares
{
	public class RequestResponseLogMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly ILogger<RequestResponseLogMiddleware> _logger;
		private readonly RecyclableMemoryStreamManager _recyclableMemoryStream;

		public RequestResponseLogMiddleware(RequestDelegate next, ILogger<RequestResponseLogMiddleware> logger)
		{
			_next = next;
			_logger = logger;
			_recyclableMemoryStream = new RecyclableMemoryStreamManager();
		}

		public async Task Invoke(HttpContext context)
		{
			_logger.LogInformation($"Request Path: {context.Request.Path}");
			_logger.LogInformation($"Request Method: {context.Request.Method}");

			// Enable buffering for the request body first
			context.Request.EnableBuffering();

			var originalRequestBody = context.Request.Body;
			var originalResponseBody = context.Response.Body;

			using (var requestBodyStream = _recyclableMemoryStream.GetStream())
			{
				using (var responseBodyStream = _recyclableMemoryStream.GetStream())
				{
					try
					{
						await context.Request.Body.CopyToAsync(requestBodyStream);
						requestBodyStream.Seek(0, SeekOrigin.Begin);
						context.Request.Body = requestBodyStream;

						context.Response.Body = responseBodyStream;

						await _next.Invoke(context);

						await LogRequestInfoAsync(context, requestBodyStream);
						await LogResponseInfoAsync(context, responseBodyStream, originalResponseBody);
					}
					catch (Exception ex)
					{
						throw new InvalidOperationException(ex.Message);
					}
					finally
					{
						context.Request.Body = originalRequestBody;
						context.Response.Body = originalResponseBody;
					}
				}
			}
		}

		private async Task LogRequestInfoAsync(HttpContext context, Stream requestBodyStream)
		{
			requestBodyStream.Seek(0, SeekOrigin.Begin);
			var requestBodyText = await new StreamReader(requestBodyStream).ReadToEndAsync();
			_logger.LogInformation($"Request Body: {requestBodyText}");
			requestBodyStream.Seek(0, SeekOrigin.Begin);
			context.Request.Body = requestBodyStream;
		}

		private async Task LogResponseInfoAsync(HttpContext context, Stream responseBodyStream, Stream originalResponseBody)
		{
			responseBodyStream.Seek(0, SeekOrigin.Begin);
			var responseBody = await new StreamReader(responseBodyStream, Encoding.UTF8).ReadToEndAsync();
			_logger.LogInformation($"Response Body:{responseBody}");
			_logger.LogInformation($"Response Status Code:{context.Response.StatusCode}");
			responseBodyStream.Seek(0, SeekOrigin.Begin);
			await responseBodyStream.CopyToAsync(originalResponseBody);
		}
	}
}
