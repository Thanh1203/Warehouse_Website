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
            var total = await _context.Producers.CountAsync();
            var dataList = await _context.Producers.ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ProducerId == item.Id);

                item.AllowDelete = !allowDelete;
            }

            var result = new
            {
                data = dataList,
                totalElement = total,
            };


            return result;
        }

        public async Task<object> SearchProducer(string str)
        {
            var total = await _context.Producers.CountAsync();
            var dataList = await _context.Producers.Where(m => m.Name.Contains(str)).ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Product_Infos.AnyAsync(p => p.ProducerId == item.Id);

                item.AllowDelete = !allowDelete;
            }

            var result = new
            {
                data = dataList,
                totalElement = total,
            };

            return result;
        }

        public async Task Create([FromBody] Producer producer)
        {
            var newProducer = new Producer
            {
                Code = producer.Code,
                Name = producer.Name,
                DateTime = DateTime.UtcNow,
            };
            _context.Producers.Add(newProducer);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Producer producer, int idUpdate)
        {
            var temp = _context.Producers.SingleOrDefault(e => e.Id == idUpdate);

            if (temp != null)
            {
                temp.Name = producer.Name;
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
