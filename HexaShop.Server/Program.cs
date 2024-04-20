using Microsoft.EntityFrameworkCore;
using HexaShop.Server.Models;
using Microsoft.Extensions.FileProviders;
using HexaShop.Server.Controllers;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

	// Add services to the container.

	builder.Services.AddControllers();
	builder.Services.AddDbContext<dbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("con")));


	builder.Services.AddEndpointsApiExplorer();
	builder.Services.AddSwaggerGen();


	var app = builder.Build();

	app.UseDefaultFiles();
	app.UseStaticFiles();

if (app.Environment.IsDevelopment())
	{
		app.UseSwagger();
		app.UseSwaggerUI();
	}
	app.UseRouting();
	app.UseHttpsRedirection();
	app.UseCors(option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
	app.UseAuthorization();

	app.MapControllers();

	app.MapFallbackToFile("/index.html");


	app.Run();