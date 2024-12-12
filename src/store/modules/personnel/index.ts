import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export default {
  namespaced: true as true,
  state: {
    users: [],
    totalRecord: 0,
  } as any,
  getters: {
    users: (state) => state.personnelData,
    totalRecord: (state) => state.totalRecord,
  },
  mutations: {
    SET_USER(state: any, payload: any) {
      state.users = payload;
    },
    SET_TOTALRECORD(state: any, payload: any) {
      state.totalRecord = payload;
    },
  },
  actions: {
    //get
    async fetchUser({ commit }, payload: any) {
      try {
        const { data }: any = await DataService.callApi(ConstantAPI.user.GET, null, payload);
        commit("SET_USER", data?.data || []);
        commit("SET_TOTALRECORD", data?.totalElemnts || 0);
      } catch (error) {
        console.log(error);
      }
    },

    async createUser({ dispatch }, payload: any) {
      try {
        const { data }:any = await DataService.callApi(ConstantAPI.user.CREATE, payload, null);
        await dispatch("fetchUser", null);
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    // //create
    // async createPersonnel({ dispatch }, payload) {
    //   try {
    //     const response: any = await DataService.callApi(ConstantAPI.personnel.CREATE, payload.state, null);
    //     await dispatch("getPersonnel", payload.params);
    //     return response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // //delete
    // async deletePersonnel({ dispatch }, payload) {
    //   try {
    //     const response: any = await DataService.callApi(ConstantAPI.personnel.DELETE, payload.state, null);
    //     await dispatch("getPersonnel", payload.params);
    //     return response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // //update
    // async updatePersonnel({ dispatch }, payload) {
    //   try {
    //     const response: any = await DataService.callApi(ConstantAPI.personnel.UPDATE, payload.state, null);
    //     await dispatch("getPersonnel", payload.params);
    //     return response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
