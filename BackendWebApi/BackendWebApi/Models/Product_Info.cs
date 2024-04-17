using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendWebApi.Models
{
    [Table("PD_Info")]
    public class Product_Info
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        [ForeignKey("PD_Category")]
        public int CategoryId { get; set; }
        [ForeignKey("PD_Classify")]
        public int ClassifyId { get; set; }
        [ForeignKey("PD_Producer")]
        public int ProducerId { get; set; }
        public string Size { get; set; }
        public string Material { get; set; }
        public string ConnectionTypes { get; set; }
        public string Color { get; set; }
        public string Designs { get; set; }
        public string Describe {  get; set; }
        public DateTime DateTime { get; set; }
        [JsonIgnore]
        public virtual Category Category { get; set; }
        [JsonIgnore]
        public virtual Classify Classify { get; set; }
        [JsonIgnore]
        public virtual Producer Producer { get; set; }
    }
}
