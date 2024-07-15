using Server.Api.AppSettings;
using Server.Api.Auth;
using Server.Api.WebAppBuilderExtensions;

const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

var cfg = builder.Configuration;
builder.Services.Configure<JwtSettingsOptions>(cfg.GetSection(JwtSettingsOptions.SectionKey));
builder.Services.AddCors(options =>
{
	options.AddPolicy(name:
		MyAllowSpecificOrigins,
		policy =>
		{
			policy
				.WithOrigins("https://localhost:3000")
				.AllowCredentials()
				.AllowAnyMethod()
				.AllowAnyHeader()
				.Build();
		}
	);
});
builder.Services.AddControllers();
builder.Services.Scan(selector => selector.AddRepositories());
builder.Services.AddAuth(cfg);
builder.Services.AddRedis(RedisSettings.ReadFrom(cfg));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCustomSwaggerGen();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
	app.UseCors(MyAllowSpecificOrigins);
}

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();