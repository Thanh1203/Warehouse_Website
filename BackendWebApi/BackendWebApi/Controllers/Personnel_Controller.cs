using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/personnel")]
    [ApiController]
    public class Personnel_Controller : Controller
    {
        private readonly IPersonnel _IPersonnel;
        
        public Personnel_Controller(IPersonnel IPersonnel)
        {
            _IPersonnel = IPersonnel;
        }

        [HttpGet]
        public async Task<IActionResult> FetchPersonnels(string? code, string? name, string? address) 
        {
            try
            {
                if (string.IsNullOrWhiteSpace(code) && string.IsNullOrWhiteSpace(name) && string.IsNullOrWhiteSpace(address))
                {
                    return Ok(await _IPersonnel.GetPersonnels()); 
                }
                else
                {
                    return Ok(await _IPersonnel.SearchPersonnel(code, name, address));
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePersonnel([FromBody] Personnel personnel)
        {
            try
            {
                await _IPersonnel.Create(personnel);
                return Ok("Create successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePersonnel([FromBody] Personnel personnel)
        {
            try
            {
                await _IPersonnel.Update(personnel);
                return Ok("Update successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePersonnel([FromBody] List<int> idsDelete)
        {
            try
            {
                await _IPersonnel.Delete(idsDelete);
                return Ok("Delete successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("address")]
        public async Task<IActionResult> GetAddressPersonnel()
        {
            try
            {
                var address = await _IPersonnel.GetAddressPersonnel();
                return Ok(address);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }

        }
    }
}
