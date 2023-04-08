import { createRouter, createWebHistory } from 'vue-router';
import PageIndex from '../views/PageIndex.vue';
import PageRegister from '../views/PageRegister.vue';
import PageLogin from '../views/PageLogin.vue';
import { RouteName } from '../const';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      path: '/',
      name: RouteName.MAIN,
      component: PageIndex,
    },
    {
      path: '/register',
      name: RouteName.REGISTER,
      component: PageRegister,
    },
    {
      path: '/login',
      name: RouteName.LOGIN,
      component: PageLogin,
    },
  ],
});
