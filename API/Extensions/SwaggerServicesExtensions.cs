using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServicesExtensions
    {
         public static IServiceCollection AddSwaggerServices(this IServiceCollection services)
         {
            services.AddSwaggerGen(c => 
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "LuckyDuck API", Version = "V1"});
            });

            return services;
         }

         public static IApplicationBuilder UserSwaggerDocumentation(this IApplicationBuilder app) 
         {
            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "LuckyDuck API v1");}
                );

            return app;    
         }
    }
}