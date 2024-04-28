using BackendWebApi.Models;

namespace BackendWebApi.Interfaces
{
    public interface ICustomer
    {
        Task<object> GetCustomers();
        Task<List<KeyValuePair<string, int>>> GetCustomerAdress();
    }
}
