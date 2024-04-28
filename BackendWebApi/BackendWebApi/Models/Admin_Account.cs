using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendWebApi.Models
{
    [Table("Admin_Account")]
    public class Admin_Account
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Phone {  get; set; }
        public string? Email { get; set; }
        [JsonIgnore]
        public virtual ICollection<Personnel>? Personnels { get; set; }
        [JsonIgnore]
        public virtual ICollection<Warehouse_Info>? Warehouse_Infos { get; set; }
        [JsonIgnore]
        public virtual ICollection<Product_Info>? Product_Infos { get; set; }
        [JsonIgnore]
        public virtual ICollection<Category>? Category_Infos { get; set;}
        [JsonIgnore]
        public virtual ICollection<Classify>? Classifies { get; set; }
        [JsonIgnore]
        public virtual ICollection<Warehouse_Import>? Warehouse_Imports { get; set; }
        [JsonIgnore]
        public virtual ICollection<Producer>? Producers { get; set; }
        [JsonIgnore]
        public virtual ICollection<Warehouse_Export>? Warehouse_Exports { get; set; }
    }
}
