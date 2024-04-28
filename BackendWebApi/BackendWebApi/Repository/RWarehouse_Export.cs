using BackendWebApi.Data;
using BackendWebApi.DTOS;
using BackendWebApi.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Repository
{
    public class RWarehouse_Export(DataContext context) : IWarehouse_Export
    {
        private readonly DataContext _context = context;

        public async Task<object> GetWeareHouseExport(int warehouseId)
        {
            var data = new List<DTOWarehouse_Export>();
            var dataList = await _context.Warehouse_Exports.Where(e => e.CompanyId == 1 && e.WarehouseId == warehouseId).ToListAsync();
            foreach (var item in dataList)
            {
                var viewModel = new DTOWarehouse_Export
                {
                    Code = item.Code,
                    TotalProduct = item.TotalProduct,
                    TimeCreate = TimeZoneInfo.ConvertTimeFromUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    TotalValue = item.TotalValue,
                };
                data.Add(viewModel);
            }
            return data;
        }

        public async Task<object> SearchWarehouseExport(string day, string month, string year, int warehouseId)
        {
            var data = new List<DTOWarehouse_Export>();
            var query = _context.Warehouse_Exports.Where(e => e.CompanyId == 1 && e.WarehouseId == warehouseId).AsQueryable();

            if (!string.IsNullOrWhiteSpace(day))
            {
                query = query.Where(e => e.DateTime.Day == int.Parse(day));
            }

            if (!string.IsNullOrWhiteSpace(month))
            {
                query = query.Where(e => e.DateTime.Month == int.Parse(month));
            }

            if (!string.IsNullOrWhiteSpace(year))
            {
                query = query.Where(e => e.DateTime.Year == int.Parse(year));
            }

            var dataList = await query.ToListAsync();

            foreach (var item in dataList)
            {
                var viewModel = new DTOWarehouse_Export
                {
                    Code = item.Code,
                    TotalProduct = item.TotalProduct,
                    TimeCreate = TimeZoneInfo.ConvertTimeFromUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    TotalValue = item.TotalValue,
                };
                data.Add(viewModel);
            }

            return data;
        }
    }
}
