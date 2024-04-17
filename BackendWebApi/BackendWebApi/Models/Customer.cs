using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendWebApi.Models
{
    [Table("Customer")]
    public class Customer
    {
        [Key]
        public string PhoneNumber { get; set; }
        public string CustomerName { get; set; }
        public double SalePoint { get; set; }
        public int TotalBuy { get; set; }
        public string Address { get; set; }
        public int Age { get; set; }
        public DateTime DateTime { get; set; }
    }
}
