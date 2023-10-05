import { CommonModule } from '@angular/common';
import { Component, AfterContentChecked } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { HeadingComponent } from '../shared/components/heading/heading.component';

import { ActionsComponent } from './components/actions/actions.component';
import { OnAction, TableComponent } from './components/table/table.component';
import { EventFormService } from './services/event-form.service';

@Component({
  selector: 'x-ical-event-generator',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ActionsComponent,
    HeadingComponent,
    TableComponent,
  ],
  templateUrl: './ical-event-generator.component.html',
})
export class IcalEventGeneratorComponent implements AfterContentChecked {
  public headers = [ 'Titulo', 'Descripción', 'Fecha Inicio', 'Fecha Termino', 'Acción' ];
  public eventToRender: string[][] = [];
  public show: boolean = true;

  constructor(
    private readonly router: Router,
    private readonly eventFormService: EventFormService,
  ) {}

  ngAfterContentChecked(): void {
    this.initializeData();
  }

  onAction(onAction: OnAction): void {
    const { action, payload } = onAction;
    const trigger = {
      edit: () => this.editAction(payload),
      clone: () => this.cloneAction(payload),
      schedule: () => this.scheduleAction(payload),
      remove: () => this.removeAction(payload),
    }[action];

    trigger();
    this.render();
  }

  private editAction({ id }: OnAction['payload']): void {
    const queryParams = { mode: 'edit', id };
    this.router.navigate(['action'], { queryParams })
  }

  private cloneAction({ id }: OnAction['payload']): void {
    const eventClone = this.eventToRender.find(([_id]) => _id === id )!;
    this.eventFormService.addRow(eventClone);
  }

  private scheduleAction({ id }: OnAction['payload']): void {
    const queryParams = { mode: 'edit', id };
    this.router.navigate(['schedule'], { queryParams })
  }

  private removeAction({ id }: OnAction['payload']): void {
    this.eventFormService.remove(Number(id));
  }

  private initializeData(): void {
    this.eventToRender = this.eventFormService.events as unknown as string[][];
  }

  private render(): void {
    this.show = false;
    setTimeout(() => this.show = true, 0);
  }
}
