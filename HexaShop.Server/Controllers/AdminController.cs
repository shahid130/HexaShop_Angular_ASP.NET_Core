using HexaShop.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace HexaShop.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		private readonly dbContext _context;
		IWebHostEnvironment _environment;
		public AdminController(dbContext context, IWebHostEnvironment environment)
		{
			_context = context;
			_environment = environment;
		}


		[HttpPost("addproduct")]
		public async Task<IActionResult> AddProduct([FromForm] ProductsImage productImg)
		{
			if (ModelState.IsValid)
			{
				string fileName = "";
				if (productImg.photo != null)
				{
					string uploadFolder = Path.Combine(_environment.WebRootPath, "assets/images");
					fileName = Guid.NewGuid().ToString() + "_" + productImg.photo.FileName;

					string filePath = Path.Combine(uploadFolder, fileName);
					using (var fileStream = new FileStream(filePath, FileMode.Create))
					{
						await productImg.photo.CopyToAsync(fileStream);
					}

					Products p = new Products
					{
						ProductName = productImg.ProductName,
						ProductDetails = productImg.ProductDetails,
						ProductType = productImg.ProductType,
						ProductPrice = productImg.ProductPrice,
						ProductImageName = fileName
					};

					Debug.WriteLine(p.ProductImageName);


					await _context.Set<Products>().AddAsync(p);
					await _context.SaveChangesAsync();
					return Ok();
				}
				else
				{

				}
			}
			return BadRequest(ModelState);
		}
	}
}
