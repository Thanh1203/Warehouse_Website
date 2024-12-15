export default {
  warehouse: {
    GET: {
      url: "warehouses",
      method: "GET",
    },
    CREATE: {
      url: "warehouses",
      method: "POST",
    },
    UPDATE: {
      url: "warehouses",
      method: "PATCH",
    },
    DELETE: {
      url: "warehouses",
      method: "DELETE",
    },
  },
  category: {
    GET: {
      url: "categories",
      method: "GET",
    },
    CREATE: {
      url: "categories",
      method: "POST",
    },
    UPDATE: {
      url: "categories",
      method: "PATCH",
    },
    DELETE: {
      url: "categories",
      method: "DELETE",
    },
  },
  classify: {
    GET: {
      url: "classifies",
      method: "GET",
    },
    CREATE: {
      url: "classifies",
      method: "POST",
    },
    UPDATE: {
      url: "classifies",
      method: "PATCH",
    },
    DELETE: {
      url: "classifies",
      method: "DELETE",
    },
  },
  customer: {},
  personnel: {
    GET: {
      url: "/users",
      method: "GET",
    },
    CREATE: {
      url: "/users",
      method: "POST",
    },
    UPDATE: {
      url: "/users",
      method: "PATCH",
    },
  },
  producer: {
    GET: {
      url: "/suppliers",
      method: "GET",
    },
    CREATE: {
      url: "/suppliers",
      method: "POST",
    },
    UPDATE: {
      url: "/suppliers",
      method: "PATCH",
    },
    DELETE: {
      url: "/suppliers",
      method: "DELETE",
    },
  },
  product: {
    GET: {
      url: "products",
      method: "GET",
    },
    CREATE: {
      url: "products",
      method: "POST",
    },
    UPDATE: {
      url: "products",
      method: "PATCH",
    },
    DELETE: {
      url: "products",
      method: "DELETE",
    },
    GET_IN_WH: {
      url: "/api/productInfo/ProductInWarehouse",
      method: "GET",
    },
    GET_OUTSIDE_WH: {
      url: "/api/productInfo/ProductOutsideWarehouse",
      method: "GET",
    },
    UPDATE_UNIT_PRICE: {
      url: "/api/warehouseData",
      method: "PUT",
    },
    GET_LIST_UNIT_PRICE: {
      url: "api/productInfo/ProductConfigPrice",
      method: "GET",
    },
  },
  warehouseImport: {
    GET: {
      url: "/api/WarehouseImport",
      method: "GET",
    },
    POST: {
      url: "/api/warehouseData",
      method: "POST",
    },
    PUT_GOODS_IMPORT: {
      url: "/api/warehouseData/GoodsImport",
      method: "PUT",
    },
    PUT_GOODS_EXPORT: {
      url: "/api/warehouseData/GoodsExport",
      method: "PUT",
    },
  },
  warehouseExport: {
    GET: {
      url: "api/WarehouseExport",
      method: "GET",
    },
  },
  dashboard: {
    GET: {
      url: "/api/dashboard",
      method: "GET",
    },
  },
  report: {
    GET_CUSTOMER: {
      url: "/api/report_customer",
      method: "GET",
    },
    GET_NEW_CUSTOMER_YEAR: {
      url: "/api/report_customer",
      method: "GET",
    },
    GET_PRODUCT: {
      url: "/api/report_product",
      method: "GET",
    },
    GET_PRODUCT_SALE: {
      url: "/api/report_product/excess_inventory",
      method: "GET",
    },
    GET_SALE: {
      url: "/api/report_product",
      method: "GET",
    },
  },
  login: {
    SIGN_IN: {
      url: "/auth/signin",
      method: "POST",
    },
    SIGN_UP: {
      url: "/auth/signup",
      method: "POST",
    },
    REFRESH_TOKEN: {
      url: "/auth/refresh",
      method: "POST",
    },
    LOGOUT: {
      url: "/auth/logout",
      method: "POST",
    },
  },
};
