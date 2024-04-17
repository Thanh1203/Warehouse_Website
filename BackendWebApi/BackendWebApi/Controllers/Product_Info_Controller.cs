using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/productInfo")]
    [ApiController]
    public class Product_Info_Controller : Controller
    {
        private readonly IProduct_Info _IProduct_Info;

        public Product_Info_Controller(IProduct_Info IProduct_Info)
        {
            _IProduct_Info = IProduct_Info;
        }

        [HttpGet]
        public async Task<IActionResult> FetchProductInfos(string? name, int? categoryId, int? classifyId, int? producerId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name) && !categoryId.HasValue && !classifyId.HasValue && !producerId.HasValue)
                {
                    return Ok(await _IProduct_Info.GetProduct_Infos());
                }
                else
                {
                    return Ok(await _IProduct_Info.SearchProductInfo(name, (int)categoryId, (int)classifyId, (int)producerId));
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
