import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Components
import Hello from '../components/Hello';

const router = new VueRouter({
    mode: '', //history
    base: '',
    routes: [
        {
            path: '/',
            name: 'hello',
            component: Hello,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

export default router;
