import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes,
    // scrollBehavior(to, from, savedPosition) {
    //   if (to?.name === from?.name && to.params === from.params) {
    //     return {};
    //   }
    //   if (to?.path !== from?.path) {
    //     return {
    //       top: 0,
    //       left: 0,
    //     };
    //   }
    // },
});

router.beforeEach((routeTo: any, routeFrom, next) => {
    const title = routeTo?.meta?.title;
    document.title = "" + title;
    return next();
})

export default router;