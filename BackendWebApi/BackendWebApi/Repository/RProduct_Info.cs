using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Repository
{
    public class RProduct_Info : IProduct_Info
    {
        private readonly DataContext _context;

        public RProduct_Info(DataContext context)
        {
            _context = context;
        }

        public async Task<object> GetProduct_Infos()
        {
            var total = await _context.Product_Infos.CountAsync();
            var dataList = await _context.Product_Infos.ToListAsync();

            var result = new
            {
                data = dataList,
                totalElement = total,
            };
            return result;
        }

        public async Task<object> SearchProductInfo(string strName, int categoryId, int classifyId, int producerId)
        {
            int cateId = categoryId;

            var total = await _context.Product_Infos.CountAsync();
            var query = _context.Product_Infos.AsQueryable();

            if (!string.IsNullOrWhiteSpace(strName))
            {
                query = query.Where(e => e.Name.Contains(strName));
            }

            if (categoryId != null)
            {
                query = query.Where(e => e.CategoryId == categoryId);
            }

            if (classifyId != null)
            {
                query = query.Where(e => e.ClassifyId == classifyId);
            }

            if (producerId != null)
            {
                query = query.Where(e => e.ProducerId == producerId);
            }

            var result = new
            {
                data = await query.ToListAsync(),
                totalElement = total,
            };

            return result;
        }
    }
}
