using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static BackendWebApi.Repository.RWarehouse_Info;

namespace BackendWebApi.Repository
{
    public class RWarehouse_Info : IWarehouse_Info
    {
        private readonly DataContext _context;

        public RWarehouse_Info(DataContext context)
        {
            _context = context;
        }

        public async Task<object> GetWarehouseInfos()
        {
            var dataList = await _context.Warehouse_Infos.ToListAsync();
            var total = await _context.Warehouse_Infos.CountAsync();
            var warehouseInfoViewModels = new List<WarehouseInfoViewModel>();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Warehouse_Data.AnyAsync(p => p.Id == item.Id);
                string? staffName = await _context.Personnels.Where( p => p.Id == item.StaffId).Select(p => p.Name).SingleOrDefaultAsync();
                item.AllowDelete = !allowDelete;
                var viewModel = new WarehouseInfoViewModel
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    Nation = item.Nation,
                    StaffId = (int)(item?.StaffId),
                    Area = item.Area,
                    Address = item.Address,
                    CompanyId = item.CompanyId,
                    AllowDelete = item.AllowDelete,
                    StaffName = staffName,
                    TimeCreate = TimeZoneInfo.ConvertTimeFromUtc((DateTime)item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy")
                };
                warehouseInfoViewModels.Add(viewModel);
            }

            var result = new
            {
                data = warehouseInfoViewModels,
                totalElement = total,
            };

            return result;
        }

        public async Task<object> SearchWarehouseInfo(string strName, string strNation, string strArea)
        {
            var warehouseInfoViewModels = new List<WarehouseInfoViewModel>();
            var query = _context.Warehouse_Infos.AsQueryable();

            if (!string.IsNullOrWhiteSpace(strName))
            {
                query = query.Where(e => e.Name.Contains(strName));
            }

            if (!string.IsNullOrWhiteSpace(strNation))
            {
                query = query.Where(e => e.Nation.Contains(strNation));
            }

            if (!string.IsNullOrWhiteSpace(strArea))
            {
                query = query.Where(e => e.Area.Contains(strArea));
            }

            var data = await query.ToListAsync();

            foreach (var item in data)
            {
                bool allowDelete = await _context.Warehouse_Data.AnyAsync(p => p.Id == item.Id);
                string? staffName = await _context.Personnels.Where(p => p.Id == item.StaffId).Select(p => p.Name).SingleOrDefaultAsync();
                item.AllowDelete = !allowDelete;
                var viewModel = new WarehouseInfoViewModel
                {
                    Id = item.Id,
                    Code = item.Code,
                    Name = item.Name,
                    Nation = item.Nation,
                    StaffId = (int)item.StaffId,
                    Area = item.Area,
                    Address = item.Address,
                    CompanyId = item.CompanyId,
                    AllowDelete = item.AllowDelete,
                    StaffName = staffName,
                    TimeCreate = TimeZoneInfo.ConvertTimeFromUtc((DateTime)item.DateTime, TimeZoneInfo.Local).ToString("dd/MM/yyyy")
                };
                warehouseInfoViewModels.Add(viewModel);
            }

            var totalElement = await query.CountAsync();


            return new
            {
                data = warehouseInfoViewModels,
                totalElement,
            };
        }

        public async Task<List<string>> GetNationWarehouse()
        {
            return await _context.Warehouse_Infos.Select(w => w.Nation).Distinct().ToListAsync();
        }

        public async Task<List<string>> GetAreaWarehouse()
        {
            return await _context.Warehouse_Infos.Select(w => w.Area).Distinct().ToListAsync();
        }

        public async Task Create([FromBody] Warehouse_Info warehouse)
        {
            var newWH = new Warehouse_Info
            {
                Code = warehouse.Code,
                Name = warehouse.Name,
                Nation = warehouse.Nation,
                Area = warehouse.Area,
                StaffId = warehouse.StaffId,
                Address = warehouse.Address,
                CompanyId = 1,
                DateTime = DateTime.UtcNow,

            };
            _context.Warehouse_Infos.Add(newWH);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Warehouse_Info warehouse)
        {
            var temp = _context.Warehouse_Infos.SingleOrDefault(e => e.Id == warehouse.Id);
            
            if (temp != null)
            {
                temp.Name = warehouse.Name;
                temp.Nation = warehouse.Nation;
                temp.Area = warehouse.Area;
                temp.StaffId = warehouse.StaffId;
            }

            await _context.SaveChangesAsync();
        }

        public async Task Delete([FromBody] List<int> ids)
        {
            foreach (int id in ids)
            {
                var temp = _context.Warehouse_Infos.SingleOrDefault(c => c.Id == id);

                if (temp != null)
                {
                    _context.Warehouse_Infos.Remove(temp);
                    await _context.SaveChangesAsync();
                }
            }
        }

        public class WarehouseInfoViewModel
        {
            public int Id { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public string Nation { get; set; }
            public int StaffId { get; set; }
            public string Area { get; set; }
            public string Address { get; set; }
            public int CompanyId { get; set; }
            public bool AllowDelete { get; set; }
            public string? StaffName { get; set; }
            public string? TimeCreate { get; set; }
        }
    }
}
