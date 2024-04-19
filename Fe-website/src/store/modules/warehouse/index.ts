import ConstantAPI from "@/services/ConstantAPI"
import { DataService } from "@/services/request"
import { FLATTEN_OBJ } from "@/utils/common"

export interface warehouse {
    warehouseInfo: any,
    totalWarehouse: number | null,
    nationData: any,
    areaData: any,
}

export default {
    namespaced: true as true,
    state: {
        warehouseInfo: [],
        totalWarehouse: 0,
        nationData: [],
        areaData: [],
    } as warehouse,
    getters: {
        warehouseInfo: (state) => state.warehouseInfo,
        totalWarehouse: (state) => state.totalWarehouse,
        nationData: (state) => state.nationData,
        areaData: (state) => state.areaData,
    },
    mutations: {
        SET_WAREHOUSE_INFO(state, payload) {
            state.warehouseInfo = payload?.map(e => FLATTEN_OBJ(e))
        },
        SET_TOTAL_WAREHOUSE(state, payload) {
            state.totalWarehouse = payload
        },
        SET_NATION_DATA(state, payload) {
            state.nationData = payload
        },
        SET_AREA_DATA(state, payload) {
            state.areaData = payload
        },
    },
    actions: {
        //get
        async getWarehouse({ commit }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.warehouse.GET, null, payload);
                await commit("SET_WAREHOUSE_INFO", response?.data);
                await commit("SET_TOTAL_WAREHOUSE", response?.totalElement);
            } catch (error) {
                console.log(error);
            }
        },
        async getNationData({ commit }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.warehouse.GET_NATION, null, payload);
                await commit("SET_NATION_DATA", response);
            } catch (error) {
                console.log(error);
            }
        },
        async getAreaData({ commit }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.warehouse.GET_AREA, null, payload);
                await commit("SET_AREA_DATA", response);
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
        //detele
        async deleteWarehouse({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.warehouse.DELETE, payload.state, null);
                await dispatch("getWarehouse", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        //update
        async updateWarehouse({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.warehouse.UPDATE, payload.state, null);
                await dispatch("getWarehouse", payload.params);
                return response;
            } catch (error) {
                console.log(error);
            }
        }
    }
}