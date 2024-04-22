using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendWebApi.DTOS;

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
            var data = new List<DTOProducer>();
            var totalElement = await _context.Producers.Where(e => e.CompanyId == 1).CountAsync();
            var dataList = await _context.Producers.Where(e => e.CompanyId == 1).ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ProducerId == item.Id);
                item.AllowDelete = !allowDelete;
                var viewModal = new DTOProducer
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    Origin = item.Origin,
                    CompanyId = item.CompanyId,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc((DateTime)item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    AllowDelete = item.AllowDelete,
                };
                data.Add(viewModal);
            }

            return new
            {
                data,
                totalElement,
            }; ;
        }

        public async Task<object> SearchProducer(string str)
        {
            var data = new List<DTOProducer>();
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
                var viewModal = new DTOProducer
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    Origin = item.Origin,
                    CompanyId = item.CompanyId,
                    TimeCreate = TimeZoneInfo.ConvertTimeToUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
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
    }
}
