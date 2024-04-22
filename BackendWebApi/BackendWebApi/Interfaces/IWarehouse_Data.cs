using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Interfaces
{
    public interface IWarehouse_Data
    {
        Task<object> Get();
        Task Create([FromBody] Warehouse_Data warehouse_Data);
        Task Update([FromBody] Warehouse_Data warehouse_Data);

    }
}
