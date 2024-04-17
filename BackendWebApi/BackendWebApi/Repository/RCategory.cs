using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Repository
{
    public class RCategory : ICategory
    {
        private readonly DataContext _context;
        public RCategory(DataContext context)
        {
            _context = context;
        }
        
        

        public async Task<object> GetCategories()
        {
            var datalist = await _context.Categories.ToListAsync();
            var total = await _context.Categories.CountAsync();

            foreach (var item in datalist)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.CategoryId == item.Id);

                item.AllowDelete = !allowDelete;
            }

            var result = new
            {
                data = datalist,
                totalElement = total
            };

            return result;
        }

        public async Task<object> SearchCategory(string str)
        {
            var total = await _context.Categories.CountAsync();
            var dataList = await _context.Categories.Where(m => m.Name.Contains(str)).ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.CategoryId == item.Id);

                item.AllowDelete = !allowDelete;
            }

            var result = new
            {
                data = dataList,
                totalElement = total,
            };

            return result;
        }

        public async Task Create([FromBody] Category category)
        {
            var newCategory = new Category
            {
                Code = category.Code,
                Name = category.Name,
                DateTime = DateTime.UtcNow,
            };

            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Category category, int idUpdate)
        {
           var temp = _context.Categories.SingleOrDefault(e => e.Id == idUpdate);

            if (temp != null)
            {
               temp.Name = category.Name;
            }

            await _context.SaveChangesAsync();
        }

        public async Task Delete([FromBody] List<int> ids)
        {
            foreach (var id in ids)
            {
                var temp = _context.Categories.SingleOrDefault(e => e.Id == id);

                if (temp != null)
                {
                    _context.Categories.Remove(temp);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
