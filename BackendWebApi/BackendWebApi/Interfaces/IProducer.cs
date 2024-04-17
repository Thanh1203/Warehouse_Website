using BackendWebApi.Models;

namespace BackendWebApi.Interfaces
{
    public interface IProducer
    {
        Task<object> GetProducers();
        Task<object> SearchProducer(string name);
        Task Create (Producer producer);
        Task Update (Producer producer, int id);
        Task Delete (List<int> id);
    }
}
