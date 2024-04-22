using BackendWebApi.Data;
using BackendWebApi.DTOS;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Repository
{
    public class RWarehouse_Data(DataContext context) : IWarehouse_Data
    {
        private readonly DataContext _context = context;

        public async Task<Object> Get()
        {
            var data = new List<DTOWarehouse_Data_List>();
            var dataList = await _context.Warehouse_Data.Where(e => e.CompanyId == 1).ToListAsync();

            foreach (var item in dataList)
            {
                string? name = await _context.Warehouse_Infos.Where(e => e.Id == item.Id).Select(e => e.Name).SingleOrDefaultAsync();
                var viewModel = new DTOWarehouse_Data_List
                {
                    Id = item.Id,
                    NameProduct = name,
                };
                data.Add(viewModel);
            }

            return new
            {
                data,
            };
        }

        public async Task Create([FromBody] Warehouse_Data warehouse_Data)
        {
            var newItem = new Warehouse_Data
            {

            };
            _context.Warehouse_Data.Add(newItem);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Warehouse_Data warehouse_Data)
        {
            var newItem = new Warehouse_Data
            {

            };
            _context.Warehouse_Data.Add(newItem);
            await _context.SaveChangesAsync();
        }
    }
}
