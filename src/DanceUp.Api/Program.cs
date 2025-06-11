using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using DanceUp.Api.Data;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var projectRootPath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", ".."));
    var envPath = Path.Combine(projectRootPath, ".env");

    if (File.Exists(envPath))
    {
        Env.Load(envPath);
        Console.WriteLine("Loaded .env file");
    }
    else
    {
        Console.WriteLine("No .env file found");
    }

    var DBUSER = Environment.GetEnvironmentVariable("PGUSER");
    var DBPASSWORD = Environment.GetEnvironmentVariable("PGPASSWORD");
    var DBNAME = Environment.GetEnvironmentVariable("PGDATABASE");
    var DBHOST = Environment.GetEnvironmentVariable("PGHOST");
    var DBPORT = Environment.GetEnvironmentVariable("PGPORT");

    var connectionString = $"Host={DBHOST};Port={DBPORT};Database={DBNAME};Username={DBUSER};Password={DBPASSWORD}";

    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException("Connection String 'Default Connection' not found.");
    }

    options.UseNpgsql(connectionString);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy => 
    {
    policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();
app.UseCors("ReactApp");
app.UseRouting();
app.MapControllers();

app.Run();

