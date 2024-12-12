import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface personnel {
  personnelData: any;
  totalPersonnel: number | null;
  loading: boolean;
}

export default {
  namespaced: true as true,
  state: {
    personnelData: [],
    totalPersonnel: 0,
    loading: true,
  } as personnel,
  getters: {
    personnelData: (state) => state.personnelData,
    totalPersonnel: (state) => state.totalPersonnel,
    loading: (state) => state.loading,
  },
  mutations: {
    SET_PERSONNEL_DATA(state, payload) {
      state.personnelData = payload;
    },
    SET_TOTAL_PERSONNEL(state, payload) {
      state.totalPersonnel = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    //get
    async getPersonnel({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const { data }: any = await DataService.callApi(ConstantAPI.personnel.GET, null, payload);
        await commit("SET_PERSONNEL_DATA", data.data);
        await commit("SET_TOTAL_PERSONNEL", data?.totalElemnts || 0);
        commit("SET_LOADING", false);
      } catch (error) {
        console.log(error);
      }
    },
    //create
    async createPersonnel({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.personnel.CREATE, payload.state, null);
        await dispatch("getPersonnel", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //update
    async updatePersonnel({ dispatch }, payload) {
      try {
        const response: any = await DataService.patch(`${ConstantAPI.personnel.UPDATE.url}/${payload.state?.id}`, payload.state, null);
        await dispatch("getPersonnel", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
