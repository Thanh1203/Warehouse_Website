import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export default {
  namespaced: true as true,
  state: {
    productData: [],
    totalElement: 0,
    productInWh: [],
    productOutWh: [],
    productConfigUnitPrice: [],
    loading: true,
  } as any,
  getters: {
    productData: (state) => state.productData,
    totalElement: (state) => state.totalElement,
    productInWh: (state) => state.productInWh,
    productOutWh: (state) => state.productOutWh,
    productConfigUnitPrice: (state) => state.productConfigUnitPrice,
    loading: (state) => state.loading,
  },
  mutations: {
    SET_PRODUCT_DATA(state, payload) {
      state.productData = payload;
    },
    SET_TOTAL_CATEGORY(state, payload) {
      state.totalElement = payload;
    },
    SET_PRODUCT_IN_WH(state, payload) {
      state.productInWh = payload;
    },
    SET_PRODUCT_OUT_WH(state, payload) {
      state.productOutWh = payload;
    },
    SET_PRODUCT_CONFIG_UNIT_PRICE(state, payload) {
      state.productConfigUnitPrice = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    //get
    async getProduct({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const { data }: any = await DataService.callApi(ConstantAPI.product.GET, null, payload);
        await commit("SET_PRODUCT_DATA", data?.data);
        await commit("SET_TOTAL_CATEGORY", data?.totalRecord);
        commit("SET_LOADING", false);
      } catch (error) {
        console.log(error);
      }
    },
    //create
    async createProduct({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.product.CREATE, payload.state, null);
        await dispatch("getProduct", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //update
    async updateProduct({ dispatch }, payload) {
      try {
        const response: any = await DataService.patch(`${ConstantAPI.product.UPDATE.url}/${payload.state?.id}`, payload.state, null);
        await dispatch("getProduct", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //delete
    async deleteProduct({ dispatch }, payload) {
      try {
        const response: any = await DataService.callApi(ConstantAPI.product.DELETE, payload.state, null);
        await dispatch("getProduct", payload.params);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    //product to import and export
    async getProductInWh({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const response: any = await DataService.get(`${ConstantAPI.product.GET_IN_WH.url}/${payload.id}`, payload?.params, null);
        await commit("SET_PRODUCT_IN_WH", response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async getProductOutsideWh({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const response: any = await DataService.get(`${ConstantAPI.product.GET_OUTSIDE_WH.url}/${payload}`, null, null);
        await commit("SET_PRODUCT_OUT_WH", response);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    // update unit price
    async updateUnitPrice({ dispatch }, payload) {
      try {
        const response: any = await DataService.put(`${ConstantAPI.product.UPDATE_UNIT_PRICE.url}/${payload?.id}`, payload?.state, null);
        await dispatch("getProductInWh", { params: payload?.params, id: payload?.id });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    // product config unit price
    async getProductConfigUnitPrice({ commit }, payload) {
      try {
        commit("SET_LOADING", true);
        const response: any = await DataService.get(`${ConstantAPI.product.GET_LIST_UNIT_PRICE.url}/${payload.id}`, payload?.params, null);
        await commit("SET_PRODUCT_CONFIG_UNIT_PRICE", response);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
