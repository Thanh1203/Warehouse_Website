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
            var data = new List<ClassifyViewModel>();
            var dataList = await _context.Classifies.ToListAsync();
            var totalElement = await _context.Classifies.Where(e => e.CompanyId == 1).CountAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ClassifyId == item.Id);
                item.AllowDelete = !allowDelete;
                var viewModel = new ClassifyViewModel
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    CompanyId = 1,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc((DateTime)item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = item.AllowDelete,
                };
                data.Add(viewModel);
            }

            var result = new
            {
                data,
                totalElement,
            };

            return result;
        }

        public async Task<object> SearchCalassifies(string str)
        {
            var data = new List<ClassifyViewModel>();
            var query = _context.Classifies.Where(e => e.CompanyId == 1).AsQueryable();

            if (!string.IsNullOrWhiteSpace(str))
            {
                query = query.Where(e => e.Name.Contains(str));
            }


            var dataList = await query.ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ClassifyId == item.Id);
                item.AllowDelete = !allowDelete;
                var viewModel = new ClassifyViewModel
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    CompanyId = 1,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc((DateTime)item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = item.AllowDelete,
                };
                data.Add(viewModel);
            }

            var totalElement = await _context.Classifies.CountAsync();

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

        public class ClassifyViewModel
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
