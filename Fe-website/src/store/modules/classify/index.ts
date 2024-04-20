import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface classify {
    classifyData: any,
    totalElement: number,
}

export default {
    namespaced: true as true,
    state: {
        classifyData: [],
        totalElement: 0,
    } as classify,
    getters: {
        classifyData: (state) => state.classifyData,
        totalElement: (state) => state.totalElement,
    },
    mutaions: {
        SET_CLASSIFY_DATA(state, payload) {
            state.classifyData = payload
        },
        SET_TOTAL_CATEGORY(state, payload) {
            state.totalElement = payload
        },
    },
    actions: {
        //get
        async getClassify({ commit }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.classify.GET, null, payload);
                await commit("")
            } catch (error) {
                console.log(error);
            }
        },
        //create
        async createClassify({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.classify.CREATE, payload.state, null);
                await dispatch("getCategory", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        //update
        async updateClassify({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.classify.UPDATE, payload.state, null);
                await dispatch("getCategory", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        //delete
        async deleteClassify({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.classify.DELETE, payload.state, null);
                await dispatch("getCategory", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
    }
}