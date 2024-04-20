import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface category {
    categoryData: any,
    totalElement: number,
}

export default {
    namespaced: true as true,
    state: {
        categoryData: [],
        totalElement: 0,
    } as category,
    getters: {
        categoryData: (state) => state.categoryData,
        totalElement: (state) => state.totalElement,
    },
    mutaions: {
        SET_CATEGORY_DATA(state, payload) {
            state.categoryData = payload
        },
        SET_TOTAL_CATEGORY(state, payload) {
            state.totalElement = payload
        },
    },
    actions: {
        //get
        async getCategory({ commit }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.category.GET, null, payload);
                await commit("SET_CATEGORY_DATA", response?.data);
                await commit("SET_TOTAL_CATEGORY", response?.totalElement);
            } catch (error) {
                console.log(error);
            }
        },
        //create 
        async createCategory({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.category.CREATE, payload.state, null);
                await dispatch("getCategory", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        //update
        async updateCategory({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.category.UPDATE, payload.state, null);
                await dispatch("getCategory", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        //delete
        async deleteCategory({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.category.DELETE, payload.state, null);
                await dispatch("getCategory", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        }
    }
}