using BackendWebApi.Data;
using BackendWebApi.DTOS;
using BackendWebApi.Interfaces;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BackendWebApi.Repository
{
    public class RWarehouse_Export(DataContext context) : IWarehouse_Export
    {
        private readonly DataContext _context = context;

        public async Task<object> GetWeareHouseExport(int warehouseId)
        {
            var data = new List<DTOWarehouse_Export>();
            var dataList = await _context.Warehouse_Exports.Where(e => e.CompanyId == 1 && e.WarehouseId == warehouseId).OrderByDescending(e => e.DateTime).ToListAsync();
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
            var datadto = new List<DTOWarehouse_Export>();
            var query = await _context.Warehouse_Exports.Where(e => e.CompanyId == 1 && e.WarehouseId == warehouseId).OrderByDescending(e => e.DateTime).ToListAsync();

            foreach (var item in query)
            {
                var viewModel = new DTOWarehouse_Export
                {
                    Code = item.Code,
                    TotalProduct = item.TotalProduct,
                    TimeCreate = TimeZoneInfo.ConvertTimeFromUtc(item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy"),
                    TotalValue = item.TotalValue,
                };
                datadto.Add(viewModel);
            }

            var data = datadto.AsQueryable();
            if (!string.IsNullOrWhiteSpace(day))
            {
                data = data.Where(e => e.TimeCreate.Contains(day));
            }

            if (!string.IsNullOrWhiteSpace(month))
            {
                data = data.Where(e => e.TimeCreate.Contains(month));
            }

            if (!string.IsNullOrWhiteSpace(year))
            {
                data = data.Where(e => e.TimeCreate.Contains(year));
            }

            return data;
        }
    }
}
