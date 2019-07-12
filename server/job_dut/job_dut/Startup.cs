using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using job_dut.Databases;
using job_dut.Exceptions;
using job_dut.Mappers;
using job_dut.Policies;
using job_dut.Security;
using job_dut.Services.AppliedJobs;
using job_dut.Services.Companies;
using job_dut.Services.CompanySkills;
using job_dut.Services.Dashboards;
using job_dut.Services.Email;
using job_dut.Services.Facultys;
using job_dut.Services.KeySkills;
using job_dut.Services.OvertimeTypes;
using job_dut.Services.PostKeySkills;
using job_dut.Services.Posts;
using job_dut.Services.ProfileUsers;
using job_dut.Services.Roles;
using job_dut.Services.Searches;
using job_dut.Services.TypeJobServices;
using job_dut.Services.UserKeySkills;
using job_dut.Services.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Swagger;

namespace job_dut
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
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(options =>
           {
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidateAudience = true,
                   ValidateLifetime = true,
                   ValidateIssuerSigningKey = true,
                   ValidIssuer = "http://localhost:5000",
                   ValidAudience = "http://localhost:5000",
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("tavia@enclave.vn"))
               };
           });
           
            services.AddDbContext<DataContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("admin", policy =>
            //        policy.Requirements.Add(new RolesOptional(1)));
            //    options.AddPolicy("company", policy =>
            //        policy.Requirements.Add(new RolesOptional(2)));
            //});

            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IFacultyService, FacultyService>();
            services.AddScoped<IKeySkillService, KeySkillService>();
            services.AddScoped<IOvertimeTypeService, OvertimeTypeService>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IProfileUserService, ProfileUserService>();
            services.AddScoped<IUserKeySkillService, UserKeySkillService>();

            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<ICompanySkillService, CompanySkillService>();

            services.AddScoped<IPostService, PostService>();
            //services.AddScoped<IPostFacultyService, PostFacultyService>();
            services.AddScoped<IPostKeySkillService, PostKeySkillService>();
            services.AddScoped<IJobTypeService, JobTypeService>();
            services.AddScoped<IDashboardService, DashboardService>();

            services.AddScoped<ISearchService, SearchService>();
            services.AddScoped<IUserJobApplyService, UserJobApplyService>();
            services.AddScoped<IEncrypter, Encrypter>();


            services.AddTransient<IEmailSender, CompanyEmailSender>();
            services.AddTransient<IEmailSender, ApplyJobEmailSender>();
            // services.AddSingleton<Microsoft.Extensions.Hosting.IHostedService, AutoSendEmailOfJobsToStudent>();


            services.AddSingleton<IAuthorizationHandler, RolesOptionalHandle>();
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            });
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseStaticFiles();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            app.UseCors(builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            app.UseHttpsRedirection();
            app.UseMiddleware(typeof(ErrorHandling));
            ////app.UseExceptionHandler("/error/{0}");
            //app.UseExceptionHandler("/error/500");
            //app.UseExceptionHandler("/error/404");
            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
