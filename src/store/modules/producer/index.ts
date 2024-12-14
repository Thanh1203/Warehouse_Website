import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export default {
  namespaced: true as true,
  state: {
    producerData: [],
    totalElement: 0,
    loading: true,
  } as any,
  getters: {
    producerData: (state) => state.producerData,
    totalElement: (state) => state.totalElement,
    loading: (state) => state.loading,
  },
  mutations: {
    SET_PRODUCER_DATA(state, payload) {
      state.producerData = payload;
    },
    SET_TOTAL_CATEGORY(state, payload) {
      state.totalElement = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    //get
    async getSupplier({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const { data }: any = await DataService.callApi(ConstantAPI.producer.GET, null, payload);
        await commit("SET_PRODUCER_DATA", data?.data);
        await commit("SET_TOTAL_CATEGORY",data?.totalRecord);
        commit("SET_LOADING", false);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    //create
    async createSupplier({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.producer.CREATE, payload.state, null);
        await dispatch("getSupplier", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //update
    async updateSupplier({ dispatch }, payload) {
      try {
        const response: any = await DataService.patch(`${ConstantAPI.producer.UPDATE.url}/${payload.state?.id}`, payload.state, null);
        await dispatch("getSupplier", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //delete
    async deleteSupplier({ dispatch }, payload) {
      try {
        const response: any = DataService.callApi(ConstantAPI.producer.DELETE, payload.state, null);
        await dispatch("getSupplier", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
