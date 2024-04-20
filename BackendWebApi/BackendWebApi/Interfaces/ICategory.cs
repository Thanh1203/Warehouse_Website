﻿using BackendWebApi.Models;

namespace BackendWebApi.Interfaces
{
    public interface ICategory
    {
        Task<object> GetCategories();
        Task<object> SearchCategory(string name);
        Task Create (Category category);
        Task Update (Category category);
        Task Delete(List<int> ids);
    }
}
