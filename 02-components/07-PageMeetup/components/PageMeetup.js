import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView';
import { fetchMeetupById } from '../meetupService.js';

const StateType = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

export default defineComponent({
  name: 'PageMeetup',

  StateType,

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      state: StateType.LOADING,
      meetup: undefined,
      error: '',
    };
  },

  watch: {
    meetupId: {
      immediate: true,

      async handler(newValue) {
        try {
          this.state = StateType.LOADING;
          this.meetup = await fetchMeetupById(newValue);
          this.state = StateType.LOADED;
        } catch (err) {
          this.error = err.message;
          this.state = StateType.ERROR;
        }
      },
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="state === $options.StateType.LOADED" :meetup="meetup" />

      <UiContainer v-if="state === $options.StateType.LOADING">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>
      
      <UiContainer v-if="state === $options.StateType.ERROR">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
