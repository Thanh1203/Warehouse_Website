using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendWebApi.DTOS;

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
            var data = new List<DTOClassify>();
            var dataList = await _context.Classifies.Where(e => e.CompanyId == 1).OrderByDescending(e => e.DateTime).ToListAsync();
            var totalElement = await _context.Classifies.Where(e => e.CompanyId == 1).CountAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ClassifyId == item.Id);
                var viewModel = new DTOClassify
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    CompanyId = item.CompanyId,
                    TimeCreate = TimeZoneInfo.ConvertTimeFromUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = !allowDelete,
                };
                data.Add(viewModel);
            }

            return new
            {
                data,
                totalElement,
            }; ;
        }

        public async Task<object> SearchCalassifies(string str)
        {
            var data = new List<DTOClassify>();
            var query = _context.Classifies.Where(e => e.CompanyId == 1).OrderByDescending(e => e.DateTime).AsQueryable();

            if (!string.IsNullOrWhiteSpace(str))
            {
                query = query.Where(e => e.Name.Contains(str));
            }


            var dataList = await query.ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ClassifyId == item.Id);
                var viewModel = new DTOClassify
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    CompanyId = item.CompanyId,
                    TimeCreate = TimeZoneInfo.ConvertTimeFromUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = !allowDelete,
                };
                data.Add(viewModel);
            }

            var totalElement = await query.CountAsync();

            return new
            {
                data,
                totalElement,
            };
        }

        public async Task Create([FromBody] Classify classify)
        {
            var newClassify = new Classify
            {
                Code = classify.Code,
                Name = classify.Name,
                DateTime = DateTime.UtcNow,
                CompanyId = 1,
            };

            _context.Classifies.Add(newClassify);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Classify classify)
        {
            var temp = _context.Classifies.SingleOrDefault(e => e.Id == classify.Id);

            if (temp != null)
            {
                temp.Code = classify.Code;
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
