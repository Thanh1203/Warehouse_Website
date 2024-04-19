import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface personnel {
    personnelData: any,
    totalPersonnel: number | null,
}

export default {
    namespaced: true as true,
    state: {
        personnelData: [],
        totalPersonnel: 0, 
    } as personnel,
    getters: {
        personnelData: (state) => state.personnelData,
        totalPersonnel: (state) => state.totalPersonnel,
    },
    mutations: {
        SET_PERSONNEL_DATA(state, payload) {
            state.personnelData = payload
        },
        SET_TOTAL_PERSONNEL(state, payload) {
            state.totalPersonnel = payload
        },
    },
    actions: {
        async getPersonnel({ commit }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.personnel.GET, null, payload);
                await commit("SET_PERSONNEL_DATA", response.data);
                await commit("SET_TOTAL_PERSONNEL", response?.totalElement);
            } catch (error) {
                console.log(error);
            }
        }
    }
}