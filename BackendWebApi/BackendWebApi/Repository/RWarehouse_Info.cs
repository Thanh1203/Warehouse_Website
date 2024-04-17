using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Warehouse_Data.AnyAsync(p => p.Id == item.Id);
                item.AllowDelete = !allowDelete;
            }

            var result = new
            {
                data = dataList,
                totalElement = total,
            };

            return result;
        }

        public async Task<object> SearchWarehouseInfo(string strName, string strNation, string strArea)
        {
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
                item.AllowDelete = !allowDelete;
            }

            var totalElement = await query.CountAsync();


            return new
            {
                data,
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
                Areage = warehouse.Areage,
                Tankage = warehouse.Tankage,
                Address = warehouse.Address,
                CompanyId = warehouse.CompanyId,
                DateTime = DateTime.UtcNow,
            };
            _context.Warehouse_Infos.Add(newWH);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Warehouse_Info warehouse, int idUpdate)
        {
            var temp = _context.Warehouse_Infos.SingleOrDefault(e => e.Id == idUpdate);
            
            if (temp != null)
            {
                temp.Name = warehouse.Name;
                temp.Nation = warehouse.Nation;
                temp.Area = warehouse.Area;
                temp.StaffId = warehouse.StaffId;
                temp.Areage = warehouse.Areage;
                temp.Tankage = warehouse.Tankage;
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
    }
}
