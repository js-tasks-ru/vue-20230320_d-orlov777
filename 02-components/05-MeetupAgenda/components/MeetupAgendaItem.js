import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    isTalk() {
      return this.agendaItem.type === 'talk';
    },
  },

  computed: {
    data() {
      const { type, title, startsAt, endsAt, description, speaker, language } = this.agendaItem;

      return {
        type,
        title: title || agendaItemDefaultTitles[type],
        icon: `/assets/icons/icon-${agendaItemIcons[type]}.svg`,
        iconKey: agendaItemIcons[type],
        time: `${startsAt} - ${endsAt}`,
        description,
        speaker,
        language,
      };
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="data.icon" class="icon" :alt="data.iconKey" />
      </div>
      <div class="agenda-item__col">{{ data.time }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ data.title }}</h3>
        <p v-if="isTalk()" class="agenda-item__talk">
          <span>{{ data.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ data.language }}</span>
        </p>
        <p>{{ data.description }}</p>
      </div>
    </div>`,
});
