using BackendWebApi.DTOS;
using BackendWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Interfaces
{
    public interface IWarehouse_Data
    {
        Task UpdateUnitPrice(int idWarehouse, int productId, double unitPrice);
        Task InsertProduct(DTOWarehouseData_Create data_Create);
        Task UpdateQuantityProduct(DTOWarehouseData_Update data_Update);
        Task DecreaseQuantityProduct(DTOWarehouseData_Update data_Update, DTOCustomer customer);
    }
}
