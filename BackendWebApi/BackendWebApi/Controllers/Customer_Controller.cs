using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/Customer")]
    [ApiController]
    public class Customer_Controller : Controller
    {
        private readonly ICustomer _ICustomer;
        public Customer_Controller(ICustomer customer) 
        {
            _ICustomer = customer;
        }

        [HttpGet]
        public async Task<IActionResult> FetchCustomer()
        {
            try
            {
                var customers = await _ICustomer.GetCustomers();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("ReportAddress")]
        public async Task<IActionResult> FetchCustomerAdress()
        {
            try
            {
                var Address = await _ICustomer.GetCustomerAdress();
                return Ok(Address);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

    }
}
