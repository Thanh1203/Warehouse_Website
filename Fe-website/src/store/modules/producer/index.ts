import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface producer {
  producerData: any;
  totalElement: number;
  loading: boolean;
}

export default {
  namespaced: true as true,
  state: {
    producerData: [],
    totalElement: 0,
    loading: true,
  } as producer,
  getters: {
    producerData: (state) => state.producerData,
    totalElement: (state) => state.totalElement,
    loading: (state) => state.loading,
  },
  mutations: {
    SET_PRODUCER_DATA(state, payload) {
      state.loading = false;
      state.producerData = payload;
    },
    SET_TOTAL_CATEGORY(state, payload) {
      state.loading = false;
      state.totalElement = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    //get
    async getProducer({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const response: any = await DataService.callApi(ConstantAPI.producer.GET, null, payload);
        await commit("SET_PRODUCER_DATA", response?.data);
        await commit("SET_TOTAL_CATEGORY", response?.totalElement);
      } catch (error) {
        console.log(error);
      }
    },
    //create
    async createProducer({ dispatch }, payload) {
      try {
        const response: any = DataService.callApi(ConstantAPI.producer.CREATE, payload.state, null);
        await dispatch("getProducer", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //update
    async updateProducer({ dispatch }, payload) {
      try {
        const response: any = DataService.callApi(ConstantAPI.producer.UPDATE, payload.state, null);
        await dispatch("getProducer", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //delete
    async deleteProducer({ dispatch }, payload) {
      try {
        const response: any = DataService.callApi(ConstantAPI.producer.DELETE, payload.state, null);
        await dispatch("getProducer", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
