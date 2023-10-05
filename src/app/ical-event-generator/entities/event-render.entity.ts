import { EventEntity } from "./event.entity";

export type Row = [number, string, string, string, string];

export class EventRenderEntity {
  public readonly row: Row;

  private constructor({ id, title, description, startDate, endDate }: EventEntity) {
    this.row = [id, title, description, startDate, endDate];
  }

  static mapEventEntities(events: EventEntity[]): Row[] {
    if (events.length === 0) return [];
    return events.map(evt => EventRenderEntity.mapEventEntity(evt)!.row);
  }

  static mapEventEntity(event: EventEntity): EventRenderEntity {
    return new EventRenderEntity({
      ...event,
      startDate: this.formatLocaleDate(event.startDate),
      endDate: this.formatLocaleDate(event.endDate),
    });
  }

  static mapRows(rows: Row[]): EventEntity[] {
    if (rows.length === 0) return [];
    return rows.map(row => EventRenderEntity.mapRow(row));
  }

  static mapRow(row: Row): EventEntity {
    const [_, title, description, startDatetime, endDatetime] = row;
    return new EventEntity({
      title, description, startDatetime, endDatetime
    });
  }

  private static formatLocaleDate = (rawDateISO: string): string => {
    const date = new Date(rawDateISO);
    const { format } = Intl.DateTimeFormat('es-CL', {
      hour12: false,
      dateStyle: 'short',
      timeStyle: 'short'
    });

    return format(date);
  }
}