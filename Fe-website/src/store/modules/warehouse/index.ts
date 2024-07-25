import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";

export interface ProductSelected {
  code: string,
  name: string,
  unitPrice: number,
  quantity: number
}

export interface ImportWarehouse {
  warehouse: string | null,
  supplier: string | null,
  productsSelected: any[],
  staff: string | null,
  dateTime: string | null,
  code: string | null,
  referenceCode: string | null,
  coupons: null,
  productQuantity: number | null,
  needPay: number | null,
}

export interface InfoWarehouse {

}

export interface StateImport {
  dataImport: ImportWarehouse,
  listProduct: any[],
}

export default {
  namespaced: true as true,
  state: {
    dataImport: {
      warehouse: null,
      supplier: null,
      productsSelected: [],
      staff: null,
      dateTime: "",
      code: "",
      referenceCode: "",
      coupons: null,
      productQuantity: 0,
      needPay: 0
    },
    listProduct: [],

  } as StateImport,
  getters: {
    dataImport: (state) => state.dataImport,
    productsSelected: (state) => state.dataImport.productsSelected,
  },
  mutations: {
    SET_WAREHOUSE(state, payload) {
      state.dataImport.warehouse = payload;
    },
    SET_SUPPLIER(state, payload) {
      state.dataImport.supplier = payload;
    },
    SET_LISTPRODUCT(state, payload) {
      state.listProduct = payload;
    },
    SET_PRODUCTSSELECTED(state, payload) {
      const result = state.dataImport.productsSelected.findIndex(obj => obj.code === payload.code);
      if (result === -1) {
        state.dataImport.productsSelected.unshift(payload);
      } else {
        state.dataImport.productsSelected[result].quantity++;
      }
    },
    DELETE_PRODUCTSELECTED(state, payload) {
      payload.forEach(element => {
        const result = state.dataImport.productsSelected.findIndex(obj => obj.code === element);
        if (result !== -1) {
          state.dataImport.productsSelected.splice(result, 1);
        }
      });

    }
  },
  actions: {
    setWarehouse({ commit }, payload) {
      commit("SET_WAREHOUSE", payload);
    },
    setSupplier({ commit }, payload) {
      commit("SET_SUPPLIER", payload);
    },
    async getListProduct({ commit }, payload) {
      try {
        const response: any = [];
        await commit("SET_LISTPRODUCT", response);
      } catch (error) {
        console.log(error);
      }
    },
    setProductsSelected({ commit }, payload) {
      commit("SET_PRODUCTSSELECTED", payload);
    },
    deleteProductsSelected({ commit }, payload) {
      commit("DELETE_PRODUCTSELECTED", payload);
    },
  },
}