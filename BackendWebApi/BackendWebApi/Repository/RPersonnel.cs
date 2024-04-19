using BackendWebApi.Data;
using BackendWebApi.Interfaces;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Repository
{
    public class RPersonnel : IPersonnel
    {
        private readonly DataContext _context;
        public RPersonnel(DataContext context)
        {
            _context = context;
        }

        public async Task<object> GetPersonnels()
        {
            var total = await _context.Personnels.CountAsync();
            var dataList = await _context.Personnels.ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Warehouse_Infos.AnyAsync(p => p.StaffId == item.Id);

                item.AllowDelete = !allowDelete;
            }

            var result = new
            {
                data = dataList,
                totalElement = total,
            };

            return result;
        }

        public async Task<object> SearchPersonnel(string strCode, string strName, string strAddress)
        {
            var total = await _context.Personnels.CountAsync();
            var query = _context.Personnels.AsQueryable();

            if (!string.IsNullOrWhiteSpace(strCode))
            {
                query = query.Where(e => e.Code.Contains(strCode));
            }

            if (!string.IsNullOrWhiteSpace(strName))
            {
                query = query.Where(e => e.Name.Contains(strName));
            }

            if (!string.IsNullOrWhiteSpace(strAddress))
            {
                query = query.Where(e => e.Address.Contains(strAddress));
            }

            var dataList = await query.ToListAsync();

            foreach (var item in dataList)
            {
                bool allowDelete = await _context.Warehouse_Infos.AnyAsync(p => p.StaffId == item.Id);

                item.AllowDelete = !allowDelete;
            }

            var result = new
            {
                data = dataList,
                totalElement = total,
            };

            return result;
        }

        public async Task Create([FromBody] Personnel personnel)
        {
            var newPersonnel = new Personnel
            {
                Code = personnel.Code,
                Name = personnel.Name,
                Address = personnel.Address,
                Role = personnel.Role,
                CompanyId = personnel.CompanyId,
                DateTime = DateTime.UtcNow,
            };

            _context.Personnels.Add(newPersonnel);
            await _context.SaveChangesAsync();
        }

        public async Task Update([FromBody] Personnel personnel, int idUpdate)
        {
            var temp = _context.Personnels.SingleOrDefault(p => p.Id == idUpdate);

            if (temp != null)
            {
                temp.Name = personnel.Name;
                temp.Address = personnel.Address;
                temp.Role = personnel.Role;
                temp.Warehouse_Info = personnel.Warehouse_Info;
            }

            await _context.SaveChangesAsync();
        }

        public async Task Delete([FromBody] List<int> ids)
        {
            foreach (var id in ids)
            {
                var temp = _context.Personnels.SingleOrDefault(e => e.Id == id);

                if (temp != null)
                {
                    _context.Personnels.Remove(temp);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
