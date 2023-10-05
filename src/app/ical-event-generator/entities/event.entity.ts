import { EventForm } from "../interfaces/event-form.interface";

export class EventEntity {
  public readonly id: number;
  public readonly title: string;
  public readonly description: string;
  public readonly allDay: boolean;
  public readonly startDate: string;
  public readonly endDate: string;

  constructor({title, description, allDay, startDate, endDate, startDatetime, endDatetime }: EventForm) {
    this.id = Number(new Date());
    this.title = title!;
    this.description = description ?? '';
    this.allDay = allDay ?? false;
    this.startDate = new Date(startDatetime ?? startDate!).toISOString();
    this.endDate = new Date(endDatetime ?? endDate!).toISOString();
  }
}