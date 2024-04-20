namespace HexaShop.Server.Models
{
	public class UserInfo
	{
		public int userID { get; set; }
		public required string userName { get; set; }
		public required string userEmail { get; set; }
		public required string userNumber { get; set; }
		public required string userAddress { get; set; }
	}
}
