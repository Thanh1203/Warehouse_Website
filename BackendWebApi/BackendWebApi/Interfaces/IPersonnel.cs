using BackendWebApi.Models;

namespace BackendWebApi.Interfaces
{
    public interface IPersonnel
    {
        Task<object> GetPersonnels();
        Task<object> SearchPersonnel(string code, string name, string address);
        Task Create(Personnel personnel);
        Task Update(Personnel personnel, int id);
        Task Delete(List<int> ids);
    }
}
