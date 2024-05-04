﻿using BackendWebApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebApi.Controllers
{
    [Route("api/report_customer")]
    [ApiController]
    public class Report_Customer_Controller(IReportCustomer reportCustomer) : Controller
    {
        private readonly IReportCustomer _reportCustomer = reportCustomer;

        [HttpGet]
        public async Task<IActionResult> FetchDataReportCustomer()
        {
            try
            {
                var data = await _reportCustomer.FetchReport(1);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("{currentYear}")]
        public async Task<IActionResult> FetchDataReportNewCustomer(int currentYear)
        {
            try
            {
                var data = await _reportCustomer.FetchReportNewCustomer(currentYear, 1);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
