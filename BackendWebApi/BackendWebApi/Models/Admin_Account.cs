﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendWebApi.Models
{
    [Table("Admin_Account")]
    public class Admin_Account
    {
        [Key]
        public int AdminAccountId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Phone {  get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public virtual ICollection<Personnel> Personnels { get; set; }
        public virtual ICollection<Warehouse_Info> Warehouse_Infos { get; set; }
    }
}
