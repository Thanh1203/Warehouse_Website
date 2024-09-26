import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => {
    return [
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: () => import("@/views/static-page/404/index.vue"),
            props: true,
            meta: {
                hideSidebar: true,
                title: "404 Not found",
                screenId: "",
            }
        }

    ];
};