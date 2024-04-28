using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Repository
{
    public class RCustomer : ICustomer
    {
        private readonly DataContext _context;
        public RCustomer(DataContext context)
        {
            _context = context;
        }

        public async Task<object> GetCustomers()
        {
            var dataList = await _context.Customers.ToListAsync();
            var total = await _context.Customers.CountAsync();

            var result = new
            {
                data = dataList,
                totalElement = total
            };

            return result;
        }

        public async Task<List<KeyValuePair<string, int>>> GetCustomerAdress()
        {
            var addressCounts = await _context.Customers
            .GroupBy(c => c.Address)
            .Select(g => new KeyValuePair<string, int>(g.Key, g.Count()))
            .ToListAsync();

            return addressCounts.OrderByDescending(pair => pair.Value).ToList();
        }

    }
}