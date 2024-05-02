using BackendWebApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class Dashboard_Controller(IDashboard dashboard) : Controller
    {
       private readonly IDashboard _IDashboard = dashboard;

        [HttpGet]
        public async Task<IActionResult> FetchDataDashboard()
        {
            try
            {
                var data = await _IDashboard.GetInfoDashboard(1);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
