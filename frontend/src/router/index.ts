import { route } from 'quasar/wrappers';
import {
    createMemoryHistory,
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useAuthStore } from 'src/stores/auth-store';

export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : process.env.VUE_ROUTER_MODE === 'history'
        ? createWebHistory
        : createWebHashHistory;

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    Router.beforeEach(async (to, from, next) => {
        //Validación para rutas protegidas
        const requiredAuth = to.meta.auth;
        const authStore = useAuthStore();

        if (authStore.token) {
            return next();
        }

        if (requiredAuth || localStorage.getItem('user')) {
            await authStore.refreshToken();

            if (authStore.token) {
                return next();
            }
            return next('login');
        }
        return next();
    });

    return Router;
});
