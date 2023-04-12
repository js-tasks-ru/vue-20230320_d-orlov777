import { createRouter, createWebHistory } from 'vue-router';
import { RouteName } from '../const';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      path: '/',
      name: RouteName.MAIN,
      component: () => import('../views/PageIndex.vue'),
    },
    {
      path: '/register',
      name: RouteName.REGISTER,
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/login',
      name: RouteName.LOGIN,
      component: () => import('../views/PageLogin.vue'),
    },
  ],
});
