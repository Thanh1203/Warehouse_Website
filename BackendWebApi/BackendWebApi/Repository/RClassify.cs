using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Repository
{
    public class RClassify : IClassify
    {
        private readonly DataContext _context;
        public RClassify(DataContext context)
        {
            _context = context;
        }

        public async Task<object> GetClassifies()
        {
            var dataList = await _context.Classifies.ToListAsync();
            var total = await _context.Classifies.CountAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ClassifyId == item.Id);

                item.AllowDelete = !allowDelete;
            }

            var result = new
            {
                data = dataList,
                totalElement = total,
            };

            return result;
        }

        public async Task<object> SearchCalassifies(string str)
        {
            var total = await _context.Classifies.CountAsync();
            var dataList = await _context.Classifies.Where(m => m.Name.Contains(str)).ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ClassifyId == item.Id);

                item.AllowDelete = !allowDelete;
            }

            var result = new
            {
                data = dataList,
                totalElement = total,
            };

            return result;
        }

        public async Task Create([FromBody] Classify classify)
        {
            var newClassify = new Classify
            {
                Code = classify.Code,
                Name = classify.Name,
                DateTime = DateTime.UtcNow,
            };

            _context.Classifies.Add(newClassify);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Classify classify, int idUpdate)
        {
            var temp = _context.Classifies.SingleOrDefault(e => e.Id == idUpdate);

            if (temp != null)
            {
                temp.Name = classify.Name;
            }

            await _context.SaveChangesAsync();
        }

        public async Task Delete([FromBody] List<int> ids)
        {
            foreach (var id in ids)
            {
                var temp = _context.Classifies.SingleOrDefault(e => e.Id ==id);
                if (temp != null)
                {
                    _context.Classifies.Remove(temp);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
