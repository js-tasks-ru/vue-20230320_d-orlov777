import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const App = {
  data() {
    return { meetupTitle: '', selectedId: '1' };
  },

  watch: {
    selectedId: {
      immediate: true,

      async handler(newValue, oldValue) {
        if (oldValue === newValue) {
          return;
        }

        try {
          this.meetupTitle = (await fetchMeetupById(newValue)).title;
        } catch (err) {
          this.meetupTitle = err;
        }
      },
    },
  },
};

createApp(App).mount('#app');
