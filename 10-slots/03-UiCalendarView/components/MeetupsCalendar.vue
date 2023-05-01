<template>
  <UiCalendarView v-slot="{ day, year, month }">
    <UiCalendarEvent
      v-for="meetup in meetupsMap.get(`${year}${month}${day}`) || []"
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

  computed: {
    meetupsMap(): Map<string, TMeetup[]> {
      return this.meetups.reduce((acc, cur) => {
        const date = new Date(cur.date);
        const key = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;

        if (!acc.has(key)) {
          acc.set(key, []);
        }
        acc.get(key).push(cur);

        return acc;
      }, new Map());
    },
  },
});
</script>

<style scoped></style>
