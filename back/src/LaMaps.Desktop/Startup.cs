using System;
using System.IO;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace LaMaps.Desktop
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appConfig = new AppConfig();
            Configuration.Bind(appConfig);
            appConfig.WorkspaceFolder = Environment.ExpandEnvironmentVariables(appConfig.WorkspaceFolder);
            services.Configure<AppConfig>(Configuration);
            var httpMessageHandler = new HttpClientHandler();
            if (appConfig.AllowUntrustedCertificates)
            {
                httpMessageHandler.ServerCertificateCustomValidationCallback = (message, certificate2, arg3, arg4) =>
                {
                    return true;
                };
            }
            var httpClient = new HttpClient(httpMessageHandler);
            services.AddSingleton(httpClient);
            
            var workspaceFolder = Path.GetFullPath(appConfig.WorkspaceFolder);
            services.AddSingleton<IFileProvider>(new PhysicalFileProvider(workspaceFolder));

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowAnyOrigin();
                });
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "LaMaps.Desktop", Version = "v1"});
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "LaMaps.Desktop v1"));
            }

            app.UseHttpsRedirection();

            app.UseCors();
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}