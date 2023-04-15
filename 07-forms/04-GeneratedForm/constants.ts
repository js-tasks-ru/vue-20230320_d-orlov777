import type { TAgendaType, TFormSchema } from './types';

export const AgendaItemTypeIcons: Record<TAgendaType, string> = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
} as const;

export const AgendaItemDefaultTitles: Record<TAgendaType, string> = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
} as const;

export const AgendaItemTypeOptions = Object.entries(AgendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: AgendaItemTypeIcons[type as TAgendaType],
}));

export const TalkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export const commonAgendaItemFormSchema: TFormSchema = {
  title: {
    label: 'Нестандартный текст (необязательно)',
    component: 'ui-input',
    props: {},
  },
};

export const FormSchema: Record<TAgendaType, TFormSchema> = {
  registration: commonAgendaItemFormSchema,
  opening: commonAgendaItemFormSchema,
  break: commonAgendaItemFormSchema,
  coffee: commonAgendaItemFormSchema,
  closing: commonAgendaItemFormSchema,
  afterparty: commonAgendaItemFormSchema,
  talk: {
    title: {
      label: 'Тема',
      component: 'ui-input',
      props: {},
    },
    speaker: {
      label: 'Докладчик',
      component: 'ui-input',
      props: {},
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
      },
    },
    language: {
      label: 'Язык',
      component: 'ui-dropdown',
      props: {
        options: TalkLanguageOptions,
        title: 'Язык',
      },
    },
  },
  other: {
    title: {
      label: 'Заголовок',
      component: 'ui-input',
      props: {},
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
      },
    },
  },
};
