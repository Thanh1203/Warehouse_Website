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
        GET: {
            url: "/api/Customer",
            method: "GET"
        },
        GET_ADDRESS: {
            url: "/api/Customer/ReportAddress",
            method: "GET"
        },
        GET_AGE: {
            url: "/api/Customer/ReportAge",
            method: "GET"
        }
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
        }
    }
}