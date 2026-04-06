using ChatBackend.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSignalR();

// Configure CORS for local Vite development
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.SetIsOriginAllowed(_ => true) // Allow any origin dynamically
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // SignalR requires credentials
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");

app.MapGet("/", () => "SignalR Chat Backend is Running!");

// Map the SignalR Hub endpoint
app.MapHub<ChatHub>("/chatHub");

app.Run();
