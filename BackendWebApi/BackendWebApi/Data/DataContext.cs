using BackendWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendWebApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {
        
        }

        public DbSet<Admin_Account> Admin_Accounts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Classify> Classifies { get; set;}
        public DbSet<Product_Info> Product_Infos { get; set; }
        public DbSet<Producer> Producers { get; set; }
        public DbSet<Warehouse_Info> Warehouse_Infos { get;set; }
        public DbSet<Personnel> Personnels { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Warehouse_Data> Warehouse_Data { get; set; }
    }
}
