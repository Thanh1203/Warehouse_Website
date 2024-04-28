import ConstantAPI from "@/services/ConstantAPI"
import { DataService } from "@/services/request"
import { FLATTEN_OBJ } from "@/utils/common"

export interface warehouse {
    warehouseInfo: any,
    totalWarehouse: number | null,
    nationData: any,
    areaData: any,
    warehouseImport: any,
    warehouseExport: any,


}

export default {
    namespaced: true as true,
    state: {
        warehouseInfo: [],
        totalWarehouse: 0,
        nationData: [],
        areaData: [],
        warehouseImport: [],
        warehouseExport: [],    

        
    } as warehouse,
    getters: {
        warehouseInfo: (state) => state.warehouseInfo,
        totalWarehouse: (state) => state.totalWarehouse,
        nationData: (state) => state.nationData,
        areaData: (state) => state.areaData,
        warehouseImport: (state) => state.warehouseImport,
        warehouseExport: (state) => state.warehouseExport,


    },
    mutations: {
        SET_WAREHOUSE_INFO(state, payload) {
            state.warehouseInfo = payload
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
        SET_WAREHOUSE_IMPORT(state, payload) {
            state.warehouseImport = payload
        },
        SET_WAREHOUSE_EXPORT(state, payload) {
            state.warehouseExport = payload
        },


    },
    actions: {
        //get
        async getWarehouse({ commit }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.warehouse.GET, null, payload);
                await commit("SET_WAREHOUSE_INFO", response?.data);
                await commit("SET_TOTAL_WAREHOUSE", response?.totalElement);
                return response;
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
        },

        //warehouse import
        //get 
        async getHistoryImport({ commit }, payload) {
            try {
                const response: any = await DataService.get(`${ConstantAPI.warehouseImport.GET.url}/${payload.id}`, payload?.params, null);
                await commit("SET_WAREHOUSE_IMPORT", response);
                return response;
            } catch (error) {
                console.log(error);
                
            }
        },
        //create
        async insertGoods({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.warehouseImport.POST, payload, null);
                return response;      
            } catch (error) {
                console.log(error);
            }
        },
        async updateGoods({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.warehouseImport.PUT_GOODS_IMPORT, payload, null);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        //warehouse export
        //get
        async getWarehouseExport({ commit }, payload) {
            try {
                const response: any = await DataService.get(`${ConstantAPI.warehouseExport.GET.url}/${payload.id}`, payload?.params, null);
                await commit("SET_WAREHOUSE_EXPORT", response);
                return response;
            } catch (error) {
                console.log(error);
                
            }
        },
        async goodsExport({ dispatch }, payload) {
            try {
                const response: any = await DataService.callApi(ConstantAPI.warehouseImport.PUT_GOODS_EXPORT, payload, null);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
    }
}