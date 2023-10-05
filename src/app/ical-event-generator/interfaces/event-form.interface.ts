import { EventEntity } from "../entities/event.entity"

type Writeable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

type Optional<Type> = {
  [Key in keyof Type]?: Type[Key] | null
}

export type EventForm = Optional<Writeable<EventEntity>> & {
  startDatetime?: string | null;
  endDatetime?: string | null;
}

export type EventFormDate = Omit<EventForm, 'startDatetime' | 'endDatetime'>
export type EventFormDateTime = Omit<EventForm, 'startDate' | 'endDate'>
