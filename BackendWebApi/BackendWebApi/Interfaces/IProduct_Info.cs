using BackendWebApi.Models;

namespace BackendWebApi.Interfaces
{
    public interface IProduct_Info
    {
        Task<object> GetProduct_Infos();
        Task<object> SearchProductInfo(string name, string categoryId, string classifyId, string producerId);
        Task Create(Product_Info product_info);
        Task Update(Product_Info product_info);
        Task Delete(List<int> ids);
        Task<object> GetProductOutsideWH(int warehouseId);
        Task<object> GetProductInsideWH(int warehouseId);
        Task<object> SearchProductInsideWH(int warehouseId, string code);
        Task<object> GetProductConfigUnitPrice(int warehouseId);
        Task<object> SearchProductConfigUnitPrice(int warehouseId, string code, string name);
    }
}
