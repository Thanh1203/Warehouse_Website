﻿using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/classify")]
    [ApiController]
    public class Classify_Controller : Controller
    {
        private readonly IClassify _TClassify;
        
        public Classify_Controller(IClassify IClassify)
        {
            _TClassify = IClassify;
        }

        [HttpGet]
        public async Task<IActionResult> FetchClassifies(string? name)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    return Ok(await _TClassify.GetClassifies());
                }
                else
                {
                    return Ok(await _TClassify.SearchCalassifies(name));
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateClassify([FromBody] Classify classify)
        {
            try
            {
                await _TClassify.Create(classify);
                return Ok("Create successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateClassify([FromBody] Classify classify, int idUPdate)
        {
            try
            {
                await _TClassify.Update(classify, idUPdate);
                return Ok("Update successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteClassify([FromBody] List<int> idsDelete)
        {
            try
            {
                await _TClassify.Delete(idsDelete);
                return Ok("Delete successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}