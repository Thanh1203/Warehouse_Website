import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { getToken } from "@/utils";

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((routeTo: any, routeFrom, next) => {
    const title = routeTo?.meta?.title;
    document.title = "" + title;
    const publicRoute = routeTo.meta.publicRoute;
    const token = getToken();
    if (!token && routeTo?.name !== "/sign-in") {
        redirecToLogin(next, publicRoute,routeTo);
    } else {
        return next();
    }
});

function redirecToLogin(next, publicRoute, routeTo) {
    if (!publicRoute) {
        return next({
            name: "signIn",
            replace: true,
            path: routeTo.path
        });
    }
    return next();
}

export default router;