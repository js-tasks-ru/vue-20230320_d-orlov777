import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  components: {
    MeetupAgendaItem,
  },

  template: `
    <ul class="agenda">
      <li class="agenda__item">
        <MeetupAgendaItem v-for="item in agenda" :agenda-item="item" />
      </li>
    </ul>`,
});
