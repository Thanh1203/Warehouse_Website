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
            var data = new List<CategoryViewModel>();
            var datalist = await _context.Categories.Where(e => e.CompanyId == 1).ToListAsync();
            var totalElement = await _context.Categories.Where(e => e.CompanyId == 1).CountAsync();

            foreach (var item in datalist)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.CategoryId == item.Id);
                var viewModel = new CategoryViewModel
                {
                    Id = item.Id,
                    Name = item.Name,
                    Code = item.Code,
                    CompanyId = item.CompanyId,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = !allowDelete,
                };
                data.Add(viewModel);
            }

            return new 
            { 
                data,
                totalElement,
            };
        }

        public async Task<object> SearchCategory(string str)
        {
            var data = new List<CategoryViewModel>();
            var query = _context.Categories.Where(e => e.CompanyId == 1).AsQueryable();

            if (!string.IsNullOrWhiteSpace(str))
            {
                query = query.Where(e => e.Name.Contains(str));
            }

            var totalElement = await query.CountAsync();
            var dataList = await query.ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.CategoryId == item.Id);
                var viewModel = new CategoryViewModel
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    CompanyId = item.CompanyId,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = !allowDelete,
                };
                data.Add(viewModel);
            }

            return new
            {
                data,
                totalElement,
            };
        }

        public async Task Create([FromBody] Category category)
        {
            var newCategory = new Category
            {
                Code = category.Code,
                Name = category.Name,
                DateTime = DateTime.UtcNow,
                CompanyId = 1,
            };

            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Category category)
        {
           var temp = _context.Categories.SingleOrDefault(e => e.Id == category.Id);

            if (temp != null)
            {
                temp.Code = category.Code;
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

        public class CategoryViewModel
        {
            public int Id { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public int CompanyId { get; set; }
            public string? TimeCreate { get; set; }
            public bool? AllowDelete { get; set; }

        }
    }
}
