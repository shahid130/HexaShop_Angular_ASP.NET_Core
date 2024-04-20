using System.ComponentModel.DataAnnotations;

namespace HexaShop.Server.Models
{
	public class Users
	{
		[Key] 
		public int UserID { get; set; }
		public required string UserName { get; set; }
		public required string UserEmail { get; set; }
		public required string UserNumber { get; set; }
		public required string UserAddress { get; set; }
		public required string UserPassword { get; set; }
	}
}
