using Microsoft.AspNetCore.Mvc;
using HexaShop.Server.Models;
using System.Diagnostics;
using static System.Net.Mime.MediaTypeNames;
using System.Runtime.Intrinsics.X86;

namespace HexaShop.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		private readonly dbContext _context;

		public HomeController(dbContext context)
		{
			_context = context;
		}


		[HttpGet("products")]
		public IActionResult GetProducts(int pageNumber = 1, int productsInOnePage = 9, decimal minPrice = 0, decimal maxPrice = 100000000, string type = "2")
		{
			try
			{
				var productsFilter = _context.products
			.Where(p => p.ProductPrice >= minPrice && p.ProductPrice <= maxPrice);

				if (type != "1")
				{
					productsFilter = productsFilter.Where(p => p.ProductType == type);
				}
				var totalProducts = productsFilter.Count();
				var products = productsFilter
					.Skip((pageNumber - 1) * productsInOnePage)
					.Take(productsInOnePage)
					.ToList();

				var responseData = new ProductsAndCount
				{
					Products = products,
					TotalProducts = totalProducts
				};

				return Ok(responseData);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}


		[HttpGet("typeofproducts")]
		public IActionResult GetTypeOfProducts ( int productsInOnePage = 6, string type = "2")
		{
			try
			{
				var productsFilter = _context.products.Where(p => p.ProductType == type);
				var products = productsFilter.Take(productsInOnePage).ToList();
				return Ok(products);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}


		/*[HttpGet("numberofproducts")]
		public IActionResult GetnumberOfProducts()
		{
			try
			{
				int totalProducts = _context.products.Count();
				//int totalPages = (int)Math.Ceiling(totalProducts / (double)ProductsInOnePage);
				return Ok(totalProducts);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}*/
	}
}
