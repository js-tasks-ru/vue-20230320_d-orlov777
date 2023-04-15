export type TAgendaType = 'registration' | 'opening' | 'talk' | 'break' | 'coffee' | 'closing' | 'afterparty' | 'other';
export type TAgendaItem = {
  id: number;
  type: TAgendaType;
  startsAt: string;
  endsAt: string;
  title?: string;
  description?: string;
  speaker?: string;
  language?: string;
};
export type TInputSchema = {
  component: string | object;
  label: string;
  props: Record<string, any>;
};
export type TFormSchema = Record<string, TInputSchema>;
