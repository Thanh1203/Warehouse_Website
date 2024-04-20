import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((routeTo: any, routeFrom, next) => {
    const title = routeTo?.meta?.title;
    document.title = "" + title;
    return next();
})

export default router;