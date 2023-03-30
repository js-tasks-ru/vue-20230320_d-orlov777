import moment from 'moment';
import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: {
      type: String,
      default: '',
    },

    place: {
      type: String,
      default: '',
    },

    date: {
      type: Number,
      default: undefined,
    },
  },

  computed: {
    humanDate() {
      return this.date ? new Date(this.date).toLocaleDateString(navigator.language, { dateStyle: 'medium' }) : '';
    },

    datetime() {
      return this.date ? moment(this.date).format('YYYY-MM-DD') : '';
    },
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="datetime">{{ humanDate }}</time>
      </li>
    </ul>`,
});
