<template>
  <UiCalendarView v-slot="{ day, year, month }">
    <UiCalendarEvent
      v-for="meetup in getDateMeetups(day, month, year)"
      tag="a"
      :href="`/meetups/${meetup.id}`"
      :key="meetup"
    >
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

type TMeetup = {
  id: number;
  date: number;
  title: string;
  __dateForDebug: string;
};

export default defineComponent({
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array as PropType<TMeetup[]>,
      required: true,
    },
  },

  methods: {
    getDateMeetups(day: number, month: number, year: number): TMeetup[] {
      return this.meetups.filter((it) => {
        const date = new Date(it.date);
        return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year;
      });
    },
  },
});
</script>

<style scoped></style>
