import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export default {
  namespaced: true as true,
  state: {
    warehouseInfo: [],
    totalWarehouse: 0,
    loading: true,
  } as any,
  getters: {
    warehouseInfo: (state) => state.warehouseInfo,
    totalWarehouse: (state) => state.totalWarehouse,
    loading: (state) => state.loading,
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
        commit("SET_LOADING_IMPORT", true);
        const response: any = await DataService.get(`${ConstantAPI.warehouseImport.GET.url}/${payload.id}`, payload?.params, null);
        await commit("SET_WAREHOUSE_IMPORT", response);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //create
    async insertGoods({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.warehouseImport.POST, payload, null);
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
        commit("SET_LOADING_EXPORT", true);
        const response: any = await DataService.get(`${ConstantAPI.warehouseExport.GET.url}/${payload.id}`, payload?.params, null);
        await commit("SET_WAREHOUSE_EXPORT", response);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async goodsExport({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.warehouseImport.PUT_GOODS_EXPORT, payload, null);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
