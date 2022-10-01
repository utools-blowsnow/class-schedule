import { createRouter, createWebHashHistory } from 'vue-router';
import index from '../views/Home.vue';
const routes = [
    {
        path: '/',
        redirect: '/home',
        meta: { index: 1 }
    },
    {
        name: 'Home',
        path: '/home',
        component: index,
        meta: { index: 1 }
    },
    {
        name: 'Setting',
        path: '/setting',
        component: () => import('../views/Setting.vue'),
        meta: { index: 2 }
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
router.afterEach((to, from) => {
    const toDepth = to.meta?.index || 0;
    const fromDepth = from.meta?.index || 0;
    to.meta.transitionName = toDepth < fromDepth ? 'zoom-out' : 'zoom-in';
});
export default router;
//# sourceMappingURL=index.js.map