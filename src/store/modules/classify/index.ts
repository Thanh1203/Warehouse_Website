import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export default {
  namespaced: true as true,
  state: {
    classifyData: [],
    totalElement: 0,
    loading: true,
  } as any,
  getters: {
    classifyData: (state) => state.classifyData,
    totalElement: (state) => state.totalElement,
    loading: (state) => state.loading,
  },
  mutations: {
    SET_CLASSIFY_DATA(state, payload) {
      state.classifyData = payload;
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
    async getClassify({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const { data }: any = await DataService.callApi(ConstantAPI.classify.GET, null, payload);
        await commit("SET_CLASSIFY_DATA", data?.data);
        await commit("SET_TOTAL_CATEGORY", data?.totalRecord); 
        commit("SET_LOADING", false);
      } catch (error) {
        console.log(error);
      }
    },
    //create
    async createClassify({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.classify.CREATE, payload.state, null);
        await dispatch("getClassify", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //update
    async updateClassify({ dispatch }, payload) {
      try {
        const response: any = await DataService.patch(`${ConstantAPI.classify.UPDATE.url}/${payload.state.id}`, payload.state, null);
        await dispatch("getClassify", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //delete
    async deleteClassify({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.classify.DELETE, payload.state, null);
        await dispatch("getClassify", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
