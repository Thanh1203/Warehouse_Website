import { translate } from "@/languages/i18n";
import type { RouteRecordRaw } from "vue-router"

export default (): RouteRecordRaw[] => {
    return [
        {
            path: "/login",
            name: "login",
            component: () => import("./login/index.vue"),
            meta: {
                title: translate("login"),
            },
        },
    ]
};