import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface dashboard {
  loading: boolean,
  dashboardData: any,
}

export default {
  namespaced: true as true,
  state: {
    loading: true,
    dashboardData: null,
  } as dashboard,
  getters: {
    dashboardData: (state) => state.dashboardData,
    loading: (state) => state.loading,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_DATA_DASHBOARD(state, payload) {
      state.loading = false;
      state.dashboardData = payload;
    },
  },
  actions: {
    async getDataDashboard({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const response: any = await DataService.callApi(ConstantAPI.dashboard.GET, null, null);
        await commit("SET_DATA_DASHBOARD", response);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  }
}