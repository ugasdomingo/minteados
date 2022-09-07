import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/IndexPage.vue') },
            {
                path: 'sobre-mi',
                component: () => import('pages/AboutPage.vue'),
            },
            {
                path: 'escritorio',
                component: () => import('pages/DeskPage.vue'),
                meta: {
                    auth: true,
                },
            },
            { path: 'login', component: () => import('pages/LoginPage.vue') },
            {
                path: 'signup',
                component: () => import('pages/RegistroPage.vue'),
            },
            {
                path: 'gallery',
                component: () => import('pages/GalleryPage.vue'),
            },
        ],
    },

    // Always leave this as last one,
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
