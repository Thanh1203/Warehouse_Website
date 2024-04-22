using System.ComponentModel.DataAnnotations.Schema;

namespace BackendWebApi.Models
{
    [Table("WH_Data")]
    public class Warehouse_Data
    {
        [ForeignKey("Warehouse_Info")]
        public int Id { get; set; }
        [ForeignKey("Product_Info")]
        public int IdProduct { get; set; }
        public string CodeProduct { get; set; }
        public double Quantity { get; set; }
        [ForeignKey("Admin_Account")]
        public int CompanyId { get; set; }
    }
}
