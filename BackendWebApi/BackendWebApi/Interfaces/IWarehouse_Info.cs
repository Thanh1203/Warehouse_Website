using BackendWebApi.Models;

namespace BackendWebApi.Interfaces
{
    public interface IWarehouse_Info
    {
        Task<object> GetWarehouseInfos();
        Task<object> SearchWarehouseInfo(string name, string nation, string area);
        Task<List<string>> GetNationWarehouse();
        Task<List<string>> GetAreaWarehouse();
        Task Create (Warehouse_Info warehouse);
        Task Update (Warehouse_Info warehouse, int id);
        Task Delete (List<int> id);
    }
}
