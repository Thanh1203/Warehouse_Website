using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendWebApi.DTOS;

namespace BackendWebApi.Repository
{
    public class RProduct_Info(DataContext context) : IProduct_Info
    {
        private readonly DataContext _context = context;

        public async Task<object> GetProduct_Infos()
        {
            var data = new List<DTOProduct>();
            var dataList = await _context.Product_Infos.Where(e => e.CompanyId == 1).ToListAsync();
            var totalElement = await _context.Product_Infos.Where(e => e.CompanyId == 1).CountAsync();
            
            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Warehouse_Data.AnyAsync(p => p.IdProduct == item.Id || (p.Quantity > 0 && p.IdProduct == item.Id));
                string? categoryName = await _context.Categories.Where(p => p.Id == item.CategoryId).Select(item => item.Name).SingleOrDefaultAsync();
                string? classifyName = await _context.Classifies.Where(p => p.Id == item.ClassifyId).Select(item => item.Name).SingleOrDefaultAsync();
                string? producerName = await _context.Producers.Where(p => p.Id == item.ProducerId).Select(item => item.Name).SingleOrDefaultAsync();

                var viewModel = new DTOProduct
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    CategoryId = item.CategoryId,
                    ClassifyId = item.ClassifyId,
                    ProducerId = item.ProducerId,
                    Size = item.Size,
                    Material = item.Material,
                    ConnectionTypes = item.ConnectionTypes,
                    Color = item.Color,
                    Designs = item.Designs,
                    Describe = item.Describe,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = !allowDelete,
                    CategoryName = categoryName,
                    ClassifyName = classifyName,
                    ProducerName = producerName,
                };
                data.Add(viewModel);
            }

            return new
            {
                data,
                totalElement,
            }; ;
        }

        public async Task<object> SearchProductInfo(string strName, string categoryId, string classifyId, string producerId)
        {
            var data = new List<DTOProduct>();
            var query = _context.Product_Infos.Where(e => e.CompanyId == 1).AsQueryable();

            if (!string.IsNullOrWhiteSpace(strName))
            {
                query = query.Where(e => e.Name.Contains(strName));
            }

            if (!string.IsNullOrWhiteSpace(categoryId))
            {
                query = query.Where(e => e.CategoryId == int.Parse(categoryId));
            }

            if (!string.IsNullOrWhiteSpace(classifyId))
            {
                query = query.Where(e => e.ClassifyId == int.Parse(classifyId));
            }

            if (!string.IsNullOrWhiteSpace(producerId))
            {
                query = query.Where(e => e.ProducerId == int.Parse(producerId));
            }
            var totalElement = await query.CountAsync();

            var dataList = await query.ToListAsync();
            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Warehouse_Data.AnyAsync(p => p.IdProduct == item.Id ||(p.Quantity > 0 && p.IdProduct == item.Id));
                string? categoryName = await _context.Categories.Where(p => p.Id == item.CategoryId).Select(item => item.Name).SingleOrDefaultAsync();
                string? classifyName = await _context.Classifies.Where(p => p.Id == item.ClassifyId).Select(item=> item.Name).SingleOrDefaultAsync();
                string? producerName = await _context.Producers.Where(p => p.Id == item.ProducerId).Select(item => item.Name).SingleOrDefaultAsync();

                var viewModel = new DTOProduct
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    CategoryId = item.CategoryId,
                    ClassifyId = item.ClassifyId,
                    ProducerId = item.ProducerId,
                    Size = item.Size,
                    Material = item.Material,
                    ConnectionTypes = item.ConnectionTypes,
                    Color = item.Color,
                    Designs = item.Designs,
                    Describe = item.Describe,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = !allowDelete,
                    CategoryName = categoryName,
                    ClassifyName = classifyName,
                    ProducerName = producerName,
                };
                data.Add(viewModel);
            }

            return new
            {
                data,
                totalElement,
            };
        }

        public async Task Create([FromBody] Product_Info product)
        {
            var newProduct = new Product_Info
            {
                Code = product.Code,
                Name = product.Name,
                CategoryId = product.CategoryId,
                ClassifyId = product.ClassifyId,
                ProducerId = product.ProducerId,
                Size = product.Size,
                Material = product.Material,
                ConnectionTypes = product.ConnectionTypes,
                Color = product.Color,
                Designs = product.Designs,
                Describe = product.Describe,
                DateTime = DateTime.UtcNow,
                CompanyId = 1,
            };
            _context.Product_Infos.Add(newProduct);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Product_Info product)
        {
            var temp = _context.Product_Infos.SingleOrDefault(e => e.Id == product.Id);
            if (temp != null)
            {
                temp.Name = product.Name;
                temp.CategoryId = product.CategoryId;
                temp.ClassifyId = product.ClassifyId;
                temp.ProducerId = product.ProducerId;
                temp.Size = product.Size;
                temp.Material = product.Material;
                temp.ConnectionTypes = product.ConnectionTypes;
                temp.Color = product.Color;
                temp.Designs = product.Designs;
                temp.Describe = product.Describe;
            }
            await _context.SaveChangesAsync();
        }

        public async Task Delete([FromBody] List<int> ids)
        {
            foreach (var id in ids)
            {
                var itemDelete = _context.Product_Infos.SingleOrDefault(c => c.Id == id);

                if (itemDelete != null)
                {
                    _context.Product_Infos.Remove(itemDelete);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
