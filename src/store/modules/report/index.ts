import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface report {
 loading: boolean;
 loadingNewCustomer: boolean;
 loadingSaleProduct: boolean;
 reportCustomer: any;
 reportNewCustomerYear: any;
 reportProduct: any;
 reportSaleProduct: any;
 reportRevenue: any;
}

export default {
 namespaced: true as true,
 state: {
  loading: true,
  loadingNewCustomer: true,
  loadingSaleProduct: true,
  reportCustomer: null,
  reportNewCustomerYear: null,
  reportProduct: null,
  reportSaleProduct: null,
  reportRevenue: null,
 } as report,
 getters: {
  loading: (state) => state.loading,
  loadingNewCustomer: (state) => state.loadingNewCustomer,
  loadingSaleProduct: (state) => state.loadingSaleProduct,
  reportCustomer: (state) => state.reportCustomer,
  reportNewCustomerYear: (state) => state.reportNewCustomerYear,
  reportProduct: (state) => state.reportProduct,
  reportSaleProduct: (state) => state.reportSaleProduct,
  reportRevenue: (state) => state.reportRevenue,
 },
 mutations: {
  SET_LOADING(state, payload) {
   state.loading = payload;
  },
  SET_LOADING_NEW_CUSTOMER(state, payload) {
   state.loadingNewCustomer = payload;
  },
  SET_LOADING_SALE_PRODUCT(state, payload) {
   state.loadingSaleProduct = payload;
  },
  SET_DATA_REPORT_CUSTOMER(state, payload) {
   state.loading = false;
   state.reportCustomer = payload;
  },
  SET_DATA_REPORT_NEW_CUSTOMER(state, payload) {
   state.loadingNewCustomer = false;
   state.reportNewCustomerYear = payload;
  },
  SET_DATA_REPORT_PRODUCT(state, payload) {
   state.loading = false;
   state.reportProduct = payload;
  },
  SET_DATA_REPORT_SALE_PRDUCT(state, payload) {
   state.loadingSaleProduct = false;
   state.reportSaleProduct = payload;
  },
  SET_DATA_REPORT_REVENUE(state, payload) {
   state.loading = false;
   state.reportRevenue = payload;
  }
 },
 actions: {
  // report customer
  async fetchDataReportCustomer({ commit }, payload) {
   try {
    commit("SET_LOADING", true);
    // const response: any = await DataService.callApi(ConstantAPI.report.GET_CUSTOMER, null, null);
    // await commit("SET_DATA_REPORT_CUSTOMER", response);
    // return response;
    commit("SET_LOADING", false);
   } catch (error) {
    console.log(error);
   }
  },

  async fetchDataReportNewCustomerYear({ commit }, payload) {
   try {
    commit("SET_LOADING_NEW_CUSTOMER", true);
    // const response: any = await DataService.get(`${ConstantAPI.report.GET_NEW_CUSTOMER_YEAR.url}/${payload}`, null, null);
    // await commit("SET_DATA_REPORT_NEW_CUSTOMER", response);
    // return response;
    commit("SET_LOADING", false);
   } catch (error) {
    console.log(error);
   }
  },

  //report product
  async fetchDataReportProduct({ commit }, payload) {
   try {
    commit("SET_LOADING", true);
    // const response: any = await DataService.callApi(ConstantAPI.report.GET_PRODUCT, null, null);
    // await commit("SET_DATA_REPORT_PRODUCT", response);
    // return response;
    commit("SET_LOADING", false);
   } catch (error) {
    console.log(error);
   }
  },

  async fetchSaleProduct({ commit }, payload) {
   try {
    commit("SET_LOADING_SALE_PRODUCT", true);
    // const response: any = await DataService.callApi(ConstantAPI.report.GET_PRODUCT_SALE, null, payload);
    // commit("SET_DATA_REPORT_SALE_PRDUCT", response);
    // return response;
    commit("SET_LOADING_SALE_PRODUCT", false);
   } catch (error) {
    console.log(error);
   }
  },

  // report renenue
  async fetchDataReportRevenue({ commit }, payload) {
   try {
    commit("SET_LOADING", true);
    // const response: any = await DataService.get(`${ConstantAPI.report.GET_SALE.url}/${payload}`,null, null);
    // await commit("SET_DATA_REPORT_REVENUE", response);
    // return response;
    commit("SET_LOADING", false);
   } catch (error) {
    console.log(error);
   }
  }
 }
}