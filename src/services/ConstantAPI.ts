export default {
    warehouse: {
        GET: {
            url: "/api/Warehouse",
            method: "GET"
        },
        GET_NATION: {
            url: "/api/Warehouse/nation",
            method: "GET"
        },
        GET_AREA: {
            url: "/api/Warehouse/area",
            medthod: "GET"
        },
        CREATE: {
            url: "api/Warehouse",
            method: "POST"
        },
        UPDATE: {
            url: "api/Warehouse",
            method: "PATCH"
        },
        DELETE: {
            url: "api/Warehouse",
            method: "DELETE"
        }
    },
    category: {
        GET: {
            url: "/api/category",
            method: "GET"
        },
        CREATE: {
            url: "/api/category",
            method: "POST"
        },
        UPDATE: {
            url: "/api/category",
            method: "PATCH"
        },
        DELETE: {
            url: "/api/category",
            method: "DELETE"
        }
    },
    classify: {
        GET: {
            url: "/api/classify",
            method: "GET"
        },
        CREATE: {
            url: "/api/classify",
            method: "POST"
        },
        UPDATE: {
            url: "/api/classify",
            method: "PATCH"
        },
        DELETE: {
            url: "/api/classify",
            method: "DELETE"
        }
    },
    customer: {

    },
    user: {
        GET: {
            url: "/users",
            method: "GET"
        },
        CREATE: {
            url: "/users",
            method: "POST"
        },
        UPDATE: {
            url: "/users",
            method: "PATCH"
        },
    },
    producer: {
        GET: {
            url: "/api/producer",
            method: "GET"
        },
        CREATE: {
            url: "/api/producer",
            method: "POST"
        },
        UPDATE: {
            url: "/api/producer",
            method: "PATCH"
        },
        DELETE: {
            url: "/api/producer",
            method: "DELETE"
        },
    },
    product: {
        GET: {
            url: "/api/productInfo",
            method: "GET"
        },
        CREATE: {
            url: "/api/productInfo",
            method: "POST"
        },
        UPDATE: {
            url: "/api/productInfo",
            method: "PATCH"
        },
        DELETE: {
            url: "/api/productInfo",
            method: "DELETE"
        },
        GET_IN_WH: {
            url: "/api/productInfo/ProductInWarehouse",
            method: "GET"
        },
        GET_OUTSIDE_WH: {
            url: "/api/productInfo/ProductOutsideWarehouse",
            method: "GET"
        },
        UPDATE_UNIT_PRICE: {
            url: "/api/warehouseData",
            method: "PATCH"
        },
        GET_LIST_UNIT_PRICE: {
            url: "api/productInfo/ProductConfigPrice",
            method: "GET"
        }
    },
    warehouseImport: {
        GET: {
            url: "/api/WarehouseImport",
            method: "GET"
        },
        POST: {
            url: "/api/warehouseData",
            method: "POST"
        },
        PATCH_GOODS_IMPORT: {
            url: "/api/warehouseData/GoodsImport",
            method: "PATCH"
        },
        PATCH_GOODS_EXPORT: {
            url: "/api/warehouseData/GoodsExport",
            method: "PATCH"
        }
    },
    warehouseExport: {
        GET: {
            url: "api/WarehouseExport",
            method: "GET"
        },
    },
    dashboard: {
        GET: {
            url: "/api/dashboard",
            method: "GET"
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
        }
    },
    login: {
        SIGN_IN: {
            url: "/auth/signin",
            method: "POST"
        },
        SIGN_UP: {
            url: "/auth/signup",
            method: "POST"
        },
        REFRESH_TOKEN: {
            url: "/auth/refresh",
            method: "POST"
        },
        LOGOUT: {
            url: "/auth/logout",
            method: "POST"
        }
    }
}