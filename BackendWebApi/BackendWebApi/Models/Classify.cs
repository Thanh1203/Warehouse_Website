﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendWebApi.Models
{
    [Table("PD_Classify")]
    public class Classify
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime DateTime { get; set; }
        [JsonIgnore]
        public virtual ICollection<Product_Info>? Product_Info { get; set; }
        [NotMapped]
        public bool? AllowDelete { get; set; }
    }
}
