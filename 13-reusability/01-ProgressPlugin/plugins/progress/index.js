import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  const progressInstance = createApp(TheTopProgressBar).mount(
    container || document.body.appendChild(document.createElement('div')),
  );

  if (router) {
    router.beforeEach((to) => {
      progressInstance.start(to.path);
    });
    router.afterEach((to) => {
      progressInstance.finish(to.path);
    });

    router.onError(() => progressInstance.fail());
  }

  const progress = {
    start: progressInstance.start,
    finish: progressInstance.finish,
    fail: progressInstance.fail,

    install(app) {
      app.provide(PROGRESS_KEY, progress);
    },
  };

  return progress;
}
