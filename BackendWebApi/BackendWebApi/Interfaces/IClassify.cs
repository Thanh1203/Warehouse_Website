using BackendWebApi.Models;

namespace BackendWebApi.Interfaces
{
    public interface IClassify
    {
        Task<object> GetClassifies();
        Task<object> SearchCalassifies(string name);
        Task Create (Classify classify);
        Task Update (Classify classify);
        Task Delete (List<int> ids);
    }
}
