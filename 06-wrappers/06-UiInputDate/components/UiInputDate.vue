<template>
  <UiInput v-model="computedModelValue" :type="type" :step="stepValue" ref="input">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { defineComponent } from 'vue';
import UiInput from './UiInput.vue';

dayjs.extend(utc);

const DateKind = {
  DATE: 'date',
  TIME: 'time',
  DATETIME_LOCAL: 'datetime-local',
} as const;

export default defineComponent({
  name: 'UiInputDate',
  inheritAttrs: false,
  props: {
    modelValue: Number,
    type: {
      type: String,
      default: DateKind.DATE,
      validate(value: string): boolean {
        return value in DateKind;
      },
    },
    step: {
      type: Number,
      default: 1,
    },
  },

  emits: ['update:modelValue'],

  components: { UiInput },

  computed: {
    dateValue(): number {
      return dayjs(this.modelValue).utc().startOf('day').valueOf();
    },

    timeValue(): number {
      return dayjs(this.modelValue).utc().valueOf() - this.dateValue;
    },

    secondValue(): number {
      return dayjs(this.modelValue).utc().diff(dayjs(this.modelValue).utc().startOf('minute'), 'milliseconds');
    },

    stepValue(): number {
      const step = Math.max(this.step, 1);
      return this.type === DateKind.TIME ? 60 * step : step;
    },

    computedModelValue: {
      get(): string {
        if (!this.modelValue) {
          return '';
        }

        switch (this.type) {
          case DateKind.TIME:
            return dayjs(this.modelValue).utc().format('HH:mm');

          case DateKind.DATETIME_LOCAL:
            return dayjs(this.modelValue).utc().format('YYYY-MM-DDTHH:mm:ss');

          default:
          case DateKind.DATE:
            return dayjs(this.modelValue).utc().format('YYYY-MM-DD');
        }
      },

      set() {
        let inputValue: number = ((this.$refs.input as typeof UiInput).$refs.input as HTMLInputElement).valueAsNumber;

        switch (this.type) {
          case DateKind.TIME:
            inputValue += this.dateValue + this.secondValue;
            break;

          case DateKind.DATE:
            inputValue += this.timeValue;
            break;
        }

        this.$emit('update:modelValue', inputValue);
      },
    },
  },
});
</script>
