using Microsoft.EntityFrameworkCore;
namespace HexaShop.Server.Models
{
	public class dbContext: DbContext
	{
		public dbContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<Users> userInfo { get; set; }
		public DbSet<Products> products { get; set; }
	}
}
