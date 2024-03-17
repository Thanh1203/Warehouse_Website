import { translate } from "@/languages/i18n";
import type { RouteRecordRaw } from "vue-router";
import defaultLayout from "@/components/layouts/defaultLayout/index.vue";

export default (): RouteRecordRaw[] => {
    return [
        {
            path: "/sign-in",
            name: "signIn",
            component: () => import("./sign-in/index.vue"),
            meta: {
                title: translate("SignIn"),
                publicRoute: true,
            },
        },
        {
            path: "/sign-up",
            name: "SignUp",
            component: () => import("./sign-up/index.vue"),
            meta: {
                title: translate("SignUp"),
                publicRoute: true,
            }
        },
        {
            path: "/",
            name: "dashboard",
            component: () => import("./dashboard/index.vue"),
            meta: {
                title: translate("Dashboard"),
                layout: defaultLayout,
            }
        },
        {
            path: "/information",
            name: "information",
            component: () => import("./information/index.vue"),
            meta: {
                title: translate("Information"),
            }
        },
        {
            path: "/setting",
            name: "setting",
            component: () => import("./setting/index.vue"),
            meta: {
                title: translate("Setting"),
                layout: defaultLayout,
            }
        },
        {
            path: "/customer-report",
            name: "customer report",
            component: () => import("./reports/customer-report/index.vue"),
            meta: {
                title: translate("CustomerReport"),
                layout: defaultLayout,
            }
        },
        {
            path: "/product-report",
            name: "product report",
            component: () => import("./reports/product-report/index.vue"),
            meta: {
                title: translate("ProductReport"),
                layout: defaultLayout,
            }
        },
        {
            path: "/sale-report",
            name: "sale report",
            component: () => import("./reports/sale-report/index.vue"),
            meta: {
                title: translate("SalesReport"),
                layout: defaultLayout,
            }
        },
        {
            path: "/personnal",
            name: "personnal",
            component: () => import("./personnel/index.vue"),
            meta: {
                title: translate("Personnel"),
                layout: defaultLayout,
            }
        },
        {
            path: "/warehouse-configuration",
            name: "warehouse configuration",
            component: () => import("./warehouse/warehouse-setting/index.vue"),
            meta: {
                title: translate("Warehouse"),
                layout: defaultLayout,
            }
        },
        {
            path: "/product-category",
            name: "product category",
            component: () => import("./products/product-category/index.vue"),
            meta: {
                title: translate("ProductCategory"),
                layout: defaultLayout,
            }
        },
        {
            path: "/product-information",
            name: "product information",
            component: () => import("./products/product-information/index.vue"),
            meta: {
                title: translate("ProductInformation"),
                layout: defaultLayout,
            }
        },
        {
            path: "/warehouse-import",
            name: "warehouse import",
            component: () => import("./warehouse/warehouse-import/index.vue"),
            meta: {
                title: translate(""),
                layout: defaultLayout,
            }
        },
        {
            path: "/warehouse-export",
            name: "warehouse export",
            component: () => import("./warehouse/warehouse-export/index.vue"),
            meta: {
                title: translate(""),
                layout: defaultLayout,
            }
        },
        {
            path: "/product-classify",
            name: "product classify",
            component: () => import("./products/product-classify/index.vue"),
            meta: {
                title: translate('ProductClassify'),
                layout: defaultLayout,
            }
        },
        {
            path: "/product-producer",
            name: "product producer",
            component: () => import("./products/product-producer/index.vue"),
            meta: {
                title: translate('Producer'),
                layout: defaultLayout,
            }
        },
    ]
};