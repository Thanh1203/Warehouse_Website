﻿using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/productInfo")]
    [ApiController]
    public class Product_Info_Controller(IProduct_Info IProduct_Info) : Controller
    {
        private readonly IProduct_Info _IProduct_Info = IProduct_Info;

        [HttpGet]
        public async Task<IActionResult> FetchProductInfos(string? name, string? categoryId, string? classifyId, string? producerId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name) && string.IsNullOrWhiteSpace(categoryId) && string.IsNullOrWhiteSpace(classifyId) && string.IsNullOrWhiteSpace(producerId))
                {
                    return Ok(await _IProduct_Info.GetProduct_Infos());
                }
                else
                {
                    return Ok(await _IProduct_Info.SearchProductInfo(name, categoryId, classifyId, producerId));
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProductInfo([FromBody] Product_Info product_Info)
        {
            try
            {
                await _IProduct_Info.Create(product_Info);
                return Ok("Create successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProductInfo([FromBody] Product_Info product_Info)
        {
            try
            {
                await _IProduct_Info.Update(product_Info);
                return Ok("Update successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProductInfo([FromBody] List<int> idsDelete)
        {
            try
            {
                await _IProduct_Info.Delete(idsDelete);
                return Ok("Delete successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("ProductOutsideWarehouse/{warehouseId}")]
        public async Task<IActionResult> GetProductOutsideWarehouse( int warehouseId)
        {
            try
            {
                return Ok(await _IProduct_Info.GetProductOutsideWH(warehouseId));
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("ProductInWarehouse/{warehouseId}")]
        public async Task<IActionResult> GetProductInWarehouse(int warehouseId, string? code)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(code))
                {
                    return Ok(await _IProduct_Info.GetProductInsideWH(warehouseId));
                }
                else
                {
                    return Ok(await _IProduct_Info.SearchProductInsideWH(warehouseId, code));
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("ProductConfigPrice/{warehouseId}")]
        public async Task<IActionResult> GetProductIConfigPrice(int warehouseId, string? code, string? name)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(code) && string.IsNullOrWhiteSpace(name))
                {
                    return Ok(await _IProduct_Info.GetProductConfigUnitPrice(warehouseId));
                }
                else
                {
                    return Ok(await _IProduct_Info.SearchProductConfigUnitPrice(warehouseId, code, name));
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

    }
}
