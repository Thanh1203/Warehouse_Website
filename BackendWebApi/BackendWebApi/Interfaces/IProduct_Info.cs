using BackendWebApi.Models;

namespace BackendWebApi.Interfaces
{
    public interface IProduct_Info
    {
        Task<object> GetProduct_Infos();
        Task<object> SearchProductInfo(string name, int categoryId, int classifyId, int producerId);
    }
}
