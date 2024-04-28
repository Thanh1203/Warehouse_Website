namespace BackendWebApi.Interfaces
{
    public interface IWarehouse_Import
    {
        Task<object> GetHistoryImport(int warehouseId);
        Task<object> SearHistoryImport(string day, string month, string year, int warehouseId);
    }
}
