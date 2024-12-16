import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export default {
  namespaced: true as true,
  state: {
    warehouseInfo: [],
    totalWarehouse: 0,
    loading: true,
    historyImport: [],
    historyExport: [],
  } as any,
  getters: {
    warehouseInfo: (state) => state.warehouseInfo,
    totalWarehouse: (state) => state.totalWarehouse,
    loading: (state) => state.loading,
    historyImport: (state) => state.historyImport,
    historyExport: (state) => state.historyExport,
  },
  mutations: {
    SET_WAREHOUSE_INFO(state, payload) {
      state.warehouseInfo = payload;
    },
    SET_TOTAL_WAREHOUSE(state, payload) {
      state.totalWarehouse = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_WAREHOUSE_IMPORT(state, payload) {
      state.historyImport = payload.data;
    },
    SET_WAREHOUSE_EXPORT(state, payload) {
      state.historyExport = payload.data;
    }
  },
  actions: {
    //get
    async getWarehouse({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const { data }: any = await DataService.callApi(ConstantAPI.warehouse.GET, null, payload);
        await commit("SET_WAREHOUSE_INFO", data?.data);
        await commit("SET_TOTAL_WAREHOUSE", data?.totalRecord);
        commit("SET_LOADING", false);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    //create
    async createWarehouse({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.warehouse.CREATE, payload.state, null);
        await dispatch("getWarehouse", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //update
    async updateWarehouse({ dispatch }, payload) {
      try {
        const response: any = await DataService.patch(`${ConstantAPI.warehouse.UPDATE.url}/${payload.state?.id}`, payload.state, null);
        await dispatch("getWarehouse", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //detele
    async deleteWarehouse({ dispatch }, payload) {
      try {
        console.log(payload.state);
        const response: any = await DataService.delete(`${ConstantAPI.warehouse.DELETE.url}/${payload.state}`, null);
        await dispatch("getWarehouse", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    //warehouse import
    //get
    async getHistoryImport({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const response: any = await DataService.callApi(ConstantAPI.warehouseImport.GET, null, payload);
        await commit("SET_WAREHOUSE_IMPORT", response);
        commit("SET_LOADING", false);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //create
    async insertGoods({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.warehouseImport.POST, payload, null);
        await dispatch("getHistoryImport", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async updateGoods({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.warehouseImport.PUT_GOODS_IMPORT, payload, null);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //warehouse export
    //get
    async getWarehouseExport({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const { data }: any = await DataService.callApi(ConstantAPI.warehouseExport.GET, payload?.params, null);
        await commit("SET_WAREHOUSE_EXPORT", data);
        commit("SET_LOADING", false);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async goodsExport({ dispatch }, payload) {
      try {
        const response: any = await DataService.post(ConstantAPI.warehouseExport.GET.url, payload, null);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
