using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Repository
{
    public class RProducer : IProducer
    {
        private readonly DataContext _context;
        public RProducer(DataContext context)
        {
            _context = context;
        }

        public async Task<object> GetProducers()
        {
            var data = new List<ProducerViewModel>();
            var totalElement = await _context.Producers.Where(e => e.CompanyId == 1).CountAsync();
            var dataList = await _context.Producers.Where(e => e.CompanyId == 1).ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ProducerId == item.Id);
                item.AllowDelete = !allowDelete;
                var viewModal = new ProducerViewModel
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    Origin = item.Origin,
                    CompanyId = 1,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc((DateTime)item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = item.AllowDelete,
                };
                data.Add(viewModal);
            }

            var result = new
            {
                data,
                totalElement,
            };


            return result;
        }

        public async Task<object> SearchProducer(string str)
        {
            var data = new List<ProducerViewModel>();
            var query = _context.Producers.Where(e => e.CompanyId == 1).AsQueryable();

            if (!string.IsNullOrWhiteSpace(str))
            {
                query = query.Where(e => e.Name.Contains(str));
            }
           
            var dataList = await query.ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ProducerId == item.Id);
                item.AllowDelete = !allowDelete;
                var viewModal = new ProducerViewModel
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    Origin = item.Origin,
                    CompanyId = 1,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc((DateTime)item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy")
                };
                data.Add(viewModal);
            }

            var totalElement = await query.CountAsync();

            return new
            {
                data,
                totalElement,
            };
        }

        public async Task Create([FromBody] Producer producer)
        {
            var newProducer = new Producer
            {
                Code = producer.Code,
                Name = producer.Name,
                Origin = producer.Origin,
                DateTime = DateTime.UtcNow,
                CompanyId = 1
            };
            _context.Producers.Add(newProducer);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Producer producer)
        {
            var temp = _context.Producers.SingleOrDefault(e => e.Id == producer.Id);

            if (temp != null)
            {
                temp.Code = producer.Code;
                temp.Name = producer.Name;
                temp.Origin = producer.Origin;
            }

            await _context.SaveChangesAsync();
        }

        public async Task Delete([FromBody] List<int> ids)
        {
            foreach (var id in ids)
            {
                var temp = _context.Producers.SingleOrDefault(e => e.Id == id);

                if (temp != null)
                {
                    _context.Producers.Remove(temp);
                    await _context.SaveChangesAsync();
                }
            }
        }

        public class ProducerViewModel
        {
            public int Id { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public string Origin { get; set; }
            public int CompanyId { get; set; }
            public string?  TimeCreate { get; set; }
            public bool AllowDelete { get; set; }

        }
    }
}
