using System.ComponentModel.DataAnnotations;

namespace HexaShop.Server.Models
{
	public class Products
	{
		[Key]
		public int ProductID { get; set; }
		public required string ProductName { get; set; }
		public required string ProductDetails { get; set; }
		public required string ProductType { get; set; }
		public required decimal ProductPrice { get; set; }
		public required string  ProductImageName { get; set; }
	}
}
