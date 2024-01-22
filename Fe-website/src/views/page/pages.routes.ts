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
                title: translate("login"),
                publicRoute: true,
            },
        },
        {
            path: "/sign-up",
            name: "signUp",
            component: () => import("./sign-up/index.vue"),
            meta: {
                title: translate("signUp"),
                publicRoute: true,
            }
        },
        {
            path: "/",
            name: "home",
            component: () => import("./home/index.vue"),
            meta: {
                title: translate("Home"),
                layout: defaultLayout,
            }
        },
        {
            path: "/information",
            name: "information",
            component: () => import("./information/index.vue"),
            meta: {
                tile: translate("Information"),
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
        }
    ]
};