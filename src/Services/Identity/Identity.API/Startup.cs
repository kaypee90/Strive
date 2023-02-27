﻿// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using System;
using Duende.IdentityServer.Services;
using Identity.API.Quickstart;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Identity.API
{
    public class Startup
    {
        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            Environment = environment;
            Configuration = configuration;
        }

        public IWebHostEnvironment Environment { get; }
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var identityConfig = Configuration.GetSection("IdentityServer");
            var spaHost = identityConfig["SpaClientHost"];
            var issuerUri = identityConfig["Issuer"];

            services.AddControllersWithViews().AddRazorRuntimeCompilation();

            var builder = services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;

                options.IssuerUri = issuerUri;

                // see https://docs.duendesoftware.com/identityserver/v5/fundamentals/resources/
                options.EmitStaticAudienceClaim = true;
            });
            
            services.AddSingleton<ICorsPolicyService>((container) => {
                var logger = container.GetRequiredService<ILogger<DefaultCorsPolicyService>>();
                return new DefaultCorsPolicyService(logger) {
                    AllowAll = true,
                };
            });

            services.AddSingleton<IUserProvider, DemoUserProvider>();

            // in-memory, code config
            builder.AddInMemoryIdentityResources(Config.IdentityResources);
            builder.AddInMemoryClients(new[] {Config.BuildSpaClient(spaHost)});
            builder.AddProfileService<ProfileService>();

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                // ref: https://github.com/aspnet/Docs/issues/2384

                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                options.RequireHeaderSymmetry = false;

                options.KnownNetworks.Clear();
                options.KnownProxies.Clear();
            });

            services.AddCors(x =>
                x.AddDefaultPolicy(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseForwardedHeaders();

            if (Environment.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseCors();

            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.None, Secure = CookieSecurePolicy.Always,
            });

            app.UseStaticFiles();

            app.UseRouting();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapDefaultControllerRoute(); });
        }
    }
}