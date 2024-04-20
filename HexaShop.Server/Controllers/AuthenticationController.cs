using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HexaShop.Server.Models;
using Azure.Core;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HexaShop.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthenticationController : ControllerBase
	{
		private readonly dbContext _context;

		public AuthenticationController(dbContext context)
		{
			_context = context;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register( Users user)
		{
			if (ModelState.IsValid)
			{
				await _context.Set<Users>().AddAsync(user);
				await _context.SaveChangesAsync();
				return Ok();
			}
			return BadRequest(ModelState);
		}

		[HttpPost("authenticate")]
		public async Task<IActionResult> Authenticate([FromBody] USerLogin loginObj)
		{
			if (ModelState.IsValid)
			{
				var existingUser = await _context.userInfo.FirstOrDefaultAsync(u => u.UserEmail == loginObj.UserEmail && u.UserPassword == loginObj.UserPassword);
				if (existingUser != null)
				{
					var token = GenerateJwtToken(existingUser.UserEmail);
					return Ok(new { Token = token });
				}
				else
				{
					return BadRequest(new { Message = "Invalid username or password" });
				}
			}
			else
			{
				return BadRequest(ModelState);
			}
		}

		[HttpGet("userinfo")]
		public IActionResult GetUserInfo(string email)
		{
			try
			{
				var user = _context.userInfo.First(u => u.UserEmail == email);
					var userInfo = new UserInfo
					{
						userID = user.UserID,
						userName = user.UserName,
						userEmail = user.UserEmail,
						userNumber = user.UserNumber,
						userAddress = user.UserAddress,
					};
				return Ok(userInfo);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}

		private string GenerateJwtToken(string email)
		{
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("hexashophexashophexashophexashophexashop"));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Email, email)
			};

			var token = new JwtSecurityToken(
				issuer: "https://localhost:4200",
				audience: "https://localhost:7127",
				claims: claims,
				expires: DateTime.UtcNow.AddDays(30),
				signingCredentials: credentials
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}



/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HexaShop.Server.Models;

namespace HexaShop.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthenticationController : ControllerBase
	{
		private readonly UserRepository _userRepository;

		public AuthenticationController(UserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		[HttpPost]
		public async Task<IActionResult> SignUp([FromBody] Users u)
		{
			await _userRepository.AddUser(u);
			return Ok();
		}
	}
}
*/