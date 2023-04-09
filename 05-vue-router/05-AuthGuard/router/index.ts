import { createRouter, createWebHistory, type RouteLocationNormalized, type Router } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

type TMiddlewareContext = {
  from: RouteLocationNormalized;
  to: RouteLocationNormalized;
  router: Router;
};

type TMiddleware = (context: TMiddlewareContext) => Promise<void>;

const log: TMiddleware = ({ from, to }) => {
  console.log({ from: from.path, to: to.path });
  return Promise.resolve();
};

const auth: TMiddleware = async ({ router, to }) => {
  if (isAuthenticated()) {
    return;
  }

  await router.push({ name: 'login', query: { ...to.query, from: to.path } });
};

const guest: TMiddleware = async ({ router }) => {
  if (!isAuthenticated()) {
    return;
  }

  await router.replace({ name: 'index' });
};

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
      alias: '/meetups',
      name: 'index',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        middlewares: [guest, log],
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
      meta: {
        middlewares: [guest, log],
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
      meta: {
        middlewares: [auth, log],
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        middlewares: [auth, log],
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const middlewares = to.meta?.middlewares;
  if (!middlewares) {
    return true;
  }

  for await (const middleware of middlewares as TMiddleware[]) {
    await middleware({ router, to, from });
  }

  return true;
});

export { router };
