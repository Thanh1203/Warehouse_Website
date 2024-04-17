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

        public async Task<object> GetAgeCustomer()
        {
            var age16_25Count = await _context.Customers.CountAsync(e => e.Age >= 16 && e.Age <= 25);
            var age25_35Count = await _context.Customers.CountAsync(e => e.Age > 25 && e.Age <= 35);
            var ageOver35Count = await _context.Customers.CountAsync(e => e.Age > 35);
            var totalCount = await _context.Customers.CountAsync();

            double age16_25Percentage = 0;
            double age25_35Percentage = 0;
            double ageOver35Percentage = 0;

            var result = new
            {
                age16_25 = age16_25Count,
                age25_35 = age25_35Count,
                ageOver35 = ageOver35Count,
            };

            if (totalCount != 0)
            {
                if (age16_25Count != 0)
                {
                    age16_25Percentage = (double)age16_25Count / totalCount * 100;
                }

                if (age25_35Count != 0)
                {
                    age25_35Percentage = (double)age25_35Count / totalCount * 100;
                }

                if (ageOver35Count != 0)
                {
                    ageOver35Percentage = (double)ageOver35Count / totalCount * 100;
                }
            }

            return new
            {
                age16_25 = age16_25Percentage,
                age25_35 = age25_35Percentage,
                ageOver35 = ageOver35Percentage,
            };
        }
    }
}