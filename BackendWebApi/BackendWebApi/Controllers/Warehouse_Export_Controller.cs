using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/WarehouseExport")]
    [ApiController]
    public class Warehouse_Export_Controller(IWarehouse_Export warehouse_Export) : Controller
    {
        private readonly IWarehouse_Export _warehouse_Export = warehouse_Export;

        [HttpGet("{warehouseId}")]
        public async Task<IActionResult> FetchWarehouseExport(int warehouseId, string? day, string? month, string? year)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(day) && string.IsNullOrWhiteSpace(month) && string.IsNullOrWhiteSpace(year))
                {
                    return Ok(await _warehouse_Export.GetWeareHouseExport(warehouseId));
                }
                else
                {
                    return Ok(await _warehouse_Export.SearchWarehouseExport(day, month, year, warehouseId));
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
