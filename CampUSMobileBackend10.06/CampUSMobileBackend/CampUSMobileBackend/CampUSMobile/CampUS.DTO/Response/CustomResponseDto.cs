using System.Net;
using System.Text.Json.Serialization;

namespace CampUS.DTO.Response
{
	public class CustomResponseDto
	{
		public object Data { get; set; }
		public bool Error { get; set; }
		public string Message { get; set; }
		[JsonIgnore]
		public HttpStatusCode StatusCode { get; set; }

		public static CustomResponseDto Success(object data, HttpStatusCode statusCode)
		{
			return new CustomResponseDto { Data = data, StatusCode = statusCode, Error = false, Message = "SUCCESS" };
		}
		public static CustomResponseDto Fail(object data, HttpStatusCode statusCode)
		{
			return new CustomResponseDto { Data = data, StatusCode = statusCode, Error = true, Message = "FAILED" };
		}
	}
}
