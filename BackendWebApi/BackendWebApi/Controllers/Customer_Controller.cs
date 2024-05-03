using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/Customer")]
    [ApiController]
    public class Customer_Controller(ICustomer customer) : Controller
    {
        private readonly ICustomer _ICustomer = customer;

        [HttpGet]
        public async Task<IActionResult> FetchCustomer(string? phoneNumber)
        {
            try
            {
                return Ok(await _ICustomer.SearchCustomer(phoneNumber));
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
