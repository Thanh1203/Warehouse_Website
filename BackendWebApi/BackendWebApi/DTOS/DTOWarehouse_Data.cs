
namespace BackendWebApi.DTOS
{
    public class DTOWarehouse_Data
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public string? CodeProduct { get; set; }
        public double Quantity { get; set; }
        public string? NameProduct { get; set; }
    }

    public class DTOWarehouse_Data_List
    {
        public int Id { get; set; }
        public string? NameProduct { get; set; }
    }
}
