import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface personnel {
    personnelData: any,
    totalPersonnel: number | null,
    addressData: any
}

export default {
    namespaced: true as true,
    state: {
        personnelData: [],
        totalPersonnel: 0,
        addressData: [],
    } as personnel,
    getters: {
        personnelData: (state) => state.personnelData,
        totalPersonnel: (state) => state.totalPersonnel,
        addressData: (state) => state.addressData,
    },
    mutations: {
        SET_PERSONNEL_DATA(state, payload) {
            state.personnelData = payload
        },
        SET_TOTAL_PERSONNEL(state, payload) {
            state.totalPersonnel = payload
        },
        SET_ADDRESS_DATA(state, payload) {
            state.addressData = payload
        },
    },
    actions: {
        //get
        async getPersonnel({ commit }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.personnel.GET, null, payload);
                await commit("SET_PERSONNEL_DATA", response.data);
                await commit("SET_TOTAL_PERSONNEL", response?.totalElement);
            } catch (error) {
                console.log(error);
            }
        },
        async getAddress({ commit }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.personnel.GET_ADDRESS, null, payload);
                await commit("SET_ADDRESS_DATA", response);
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
        //delete
        async deletePersonnel({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.personnel.DELETE, payload.state, null);
                await dispatch("getPersonnel", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        //update
        async updatePersonnel({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.personnel.UPDATE, payload.state, null);
                await dispatch("getPersonnel", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        }
    }
}