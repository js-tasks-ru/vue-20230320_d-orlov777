<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" :options="$options.AgendaItemTypeOptions" name="type" v-model="localData.type" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput type="time" placeholder="00:00" name="startsAt" v-model="localData.startsAt" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" placeholder="00:00" name="endsAt" v-model="localData.endsAt" />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup :label="titleLabel">
      <UiInput name="title" v-model="localData.title" />
    </UiFormGroup>
    <UiFormGroup label="Докладчик" v-if="localData.type === 'talk'">
      <UiInput name="speaker" v-model="localData.speaker" />
    </UiFormGroup>
    <UiFormGroup label="Описание" v-if="localData.type === 'talk' || localData.type === 'other'">
      <UiInput multiline name="description" v-model="localData.description" />
    </UiFormGroup>
    <UiFormGroup label="Язык" v-if="localData.type === 'talk'">
      <UiDropdown title="Язык" :options="$options.TalkLanguageOptions" name="language" v-model="localData.language" />
    </UiFormGroup>
  </fieldset>
</template>

<script lang="ts">
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';
import { defineComponent, type PropType } from 'vue';

type TAgendaType = 'registration' | 'opening' | 'talk' | 'break' | 'coffee' | 'closing' | 'afterparty' | 'other';
type TAgendaItem = {
  id: number;
  type: TAgendaType;
  startsAt: string;
  endsAt: string;
  title?: string;
  description?: string;
  speaker?: string;
  language?: string;
};

const AgendaItemTypeIcons: Record<TAgendaType, string> = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
} as const;

const AgendaItemDefaultTitles: Record<TAgendaType, string> = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
} as const;

const AgendaItemTypeOptions = Object.entries(AgendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: AgendaItemTypeIcons[type as TAgendaType],
}));

const TalkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

const timeToMs = (time: string): number => {
  const [h, m] = time.split(':');
  return 1000 * 60 * parseInt(m) + 1000 * 60 * 60 * parseInt(h);
};

const msToTime = (ms: number): string => new Date(ms).toISOString().split('T')[1].slice(0, 5);

export default defineComponent({
  name: 'MeetupAgendaItemForm',

  AgendaItemTypeOptions,
  TalkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object as PropType<TAgendaItem>,
      required: true,
    },
  },

  emits: ['remove', 'update:agendaItem'],

  data(): { localData: TAgendaItem } {
    return {
      localData: { ...this.agendaItem },
    };
  },

  computed: {
    titleLabel(): string {
      switch (this.localData.type) {
        case 'talk':
          return 'Тема';
        case 'other':
          return 'Заголовок';
        default:
          return 'Нестандартный текст (необязательно)';
      }
    },
  },

  watch: {
    ['localData.startsAt'](newValue: string, oldValue: string) {
      this.localData.endsAt = msToTime(timeToMs(this.localData.endsAt) + timeToMs(newValue) - timeToMs(oldValue));
    },

    localData: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', newValue);
      },
    },
  },
});
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
