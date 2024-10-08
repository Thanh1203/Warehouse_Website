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
            method: "PUT"
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
            method: "PUT"
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
            method: "PUT"
        },
        DELETE: {
            url: "/api/classify",
            method: "DELETE"
        }
    },
    customer: {

    },
    personnel: {
        GET: {
            url: "/api/personnel",
            method: "GET"
        },
        CREATE: {
            url: "/api/personnel",
            method: "POST"
        },
        UPDATE: {
            url: "/api/personnel",
            method: "PUT"
        },
        DELETE: {
            url: "/api/personnel",
            method: "DELETE"
        },
        GET_ADDRESS: {
            url: "/api/personnel/address",
            method: "GET",
        }
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
            method: "PUT"
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
            method: "PUT"
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
            method: "PUT"
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
        PUT_GOODS_IMPORT: {
            url: "/api/warehouseData/GoodsImport",
            method: "PUT"
        },
        PUT_GOODS_EXPORT: {
            url: "/api/warehouseData/GoodsExport",
            method: "PUT"
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
            url: "/api/Login/signIn",
            method: "POST"
        },
        SIGN_UP: {
            url: "/api/Login/signUp",
            method: "POST"
        }
    }
}