
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        public RequestDelegate _next;
        public IHostEnvironment _env;
        public ILogger<ExceptionMiddleware> _logger;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _logger= logger;
            _env= env;
            _next= next;
            
        }
      public async Task InvokeAsync(HttpContext context)
      {
          try
          {
              await _next(context);
          }
          catch (Exception ex)
          {
              _logger.LogError(ex, ex.Message);
              context.Response.ContentType= "application/json";
              context.Response.StatusCode= 500;

              var response = new ProblemDetails 
              {
                  Status= 500,
                  Title= ex.Message,
                  Detail= _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
              };

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}
