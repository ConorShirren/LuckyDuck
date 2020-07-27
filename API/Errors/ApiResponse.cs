namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(StatusCode);
        }

        public int StatusCode { get; set; } 
        public string  Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode) 
        {
            return statusCode switch 
            {
                400 => "You have made a bad request",
                401 => "Not Authorized",
                404 => "Resource not found",
                500 => "Internal Server Error",
                _ => null
            };
        }
    }
}