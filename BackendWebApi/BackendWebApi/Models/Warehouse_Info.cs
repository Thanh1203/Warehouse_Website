using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendWebApi.Models
{
    [Table("Warehouse_Info")]
    public class Warehouse_Info
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Nation { get; set; }
        [ForeignKey("Personnel")]
        public int StaffId { get; set; }
        public string Area { get; set; }
        public string Address { get; set; }
        public double Areage { get; set; }
        public double Tankage { get; set; }
        [ForeignKey("Admin_Account")]
        public int CompanyId { get; set; }
        public DateTime DateTime { get; set; }
        [JsonIgnore]
        public virtual Personnel? Personnel { get; set; }
        [JsonIgnore]
        public virtual Admin_Account? Admin_Account { get; set; }
        [NotMapped]
        public bool? AllowDelete { get; set; }
    }
}
