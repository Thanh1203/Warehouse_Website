using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/catgory")]
    [ApiController]
    public class Category_Controller : Controller
    {
        private readonly ICategory _ICategory;

        public Category_Controller(ICategory ICategory)
        {
            _ICategory = ICategory;
        }

        [HttpGet]
        public async Task<IActionResult> FetchCategories(string? name)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    return Ok(await _ICategory.GetCategories());
                }
                else
                {
                    return Ok(await _ICategory.SearchCategory(name));
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory ([FromBody] Category category)
        {
            try
            {
                await _ICategory.Create(category);
                return Ok("Create successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCategory([FromBody] Category category, int idUpdate)
        {
            try
            {
                await _ICategory.Update(category, idUpdate);
                return Ok("Update successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCategory([FromBody] List<int> idsDelete)
        {
            try
            {
                await _ICategory.Delete(idsDelete);
                return Ok("Delete successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
