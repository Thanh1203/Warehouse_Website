import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface report {
 loading: boolean;
 loadingNewCustomer: boolean;
 reportCustomer: any;
 reportNewCustomerYear: any;
}

export default {
 namespaced: true as true,
 state: {
  loading: true,
  loadingNewCustomer: true,
  reportCustomer: null,
  reportNewCustomerYear: null,
 } as report,
 getters: {
  loading: (state) => state.loading,
  loadingNewCustomer: (state) => state.loadingNewCustomer,
  reportCustomer: (state) => state.reportCustomer,
  reportNewCustomerYear: (state) => state.reportNewCustomerYear,
 },
 mutations: {
  SET_LOADING(state, payload) {
   state.loading = payload;
  },
  SET_LOADING_NEW_CUSTOMER(state, payload) {
   state.loadingNewCustomer = payload;
  },
  SET_DATA_REPORT_CUSTOMER(state, payload) {
   state.loading = false;
   state.reportCustomer = payload;
  },
  SET_DATA_REPORT_NEW_CUSTOMER(state, payload) {
   state.loadingNewCustomer = false;
   state.reportNewCustomerYear = payload;
  }
 },
 actions: {
  async fetchDataReportCustomer({ commit }, payload) {
   try {
    commit("SET_LOADING", true);
    const response: any = await DataService.callApi(ConstantAPI.report.GET_CUSTOMER, null, null);
    await commit("SET_DATA_REPORT_CUSTOMER", response);
    return response;
   } catch (error) {
    console.log(error);
   }
  },
  async fetchDataReportNewCustomerYear({ commit }, payload) {
   try {
    commit("SET_LOADING_NEW_CUSTOMER", true);
    const response: any = await DataService.get(`${ConstantAPI.report.GET_NEW_CUSTOMER_YEAR.url}/${payload}`, null, null);
    await commit("SET_DATA_REPORT_NEW_CUSTOMER", response);
    return response;
   } catch (error) {
    console.log(error);
   }
  }
 }
}