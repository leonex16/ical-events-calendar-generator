import { Injectable } from '@angular/core';
import { EventEntity } from '../entities/event.entity';
import { EventForm } from '../interfaces/event-form.interface';
import { EventRenderEntity, Row } from '../entities/event-render.entity';

@Injectable({ 'providedIn': 'root' })
export class EventFormService {
  private _events: EventEntity[] = [
    {
        "id": 1696518529049,
        "title": "Super buen evento",
        "description": "El mejor evento de CHILE",
        "allDay": false,
        "startDate": "2023-10-05T19:08:48.000Z",
        "endDate": "2023-10-05T19:08:48.000Z"
    },
    {
        "id": 1696518532285,
        "title": "Super buen evento",
        "description": "El mejor evento de CHILE",
        "allDay": false,
        "startDate": "2023-10-05T19:08:51.000Z",
        "endDate": "2023-10-05T19:08:51.000Z"
    }
];

  get events(): Row[] {
    return EventRenderEntity.mapEventEntities(this._events);
  }

  save(form: EventForm): void {
    const event = new EventEntity(form);
    this._events.push(event);
  }

  addRow(row: Row | string[]): void {
    console.log(this.events)
    this._events = [...this._events, EventRenderEntity.mapRow(row as Row)];
    console.log(this.events)

  }

  remove(id: number): void {
    const events = this._events.filter(({ id: _id }) => _id !== id );
    this._events = [...events];
  }
}