
namespace BackendWebApi.DTOS
{   
    public class DTOWarehouse_Update_UnitPrice
    {
        public int ProductId { get; set; }
        public double UntiPirce { get; set; }
    }
    public class DTOWarehouseData_DataInsert
    {
        public int Idroduct { get; set; }
        public string? CodeProduct { get; set; }
        public int Quantity { get; set; }
    }
    public class DTOWarehouseData_Create
    {
        public int IdWarehouse { get; set; }
        public int TotalProduct { get; set; }
        public List<DTOWarehouseData_DataInsert> DataInsert { get; set; }
    }
    public class DTOWarehouseData_DataUpdate
    {
        public int Idroduct { get; set; }
        public int Quantity { get; set; }
    }

    public class DTOWarehouseData_Update
    {
        public int IdWarehouse { get; set;}
        public int TotalProduct { get; set; }
        public List<DTOWarehouseData_DataUpdate> DataUpdate { get; set; }
    }
}
