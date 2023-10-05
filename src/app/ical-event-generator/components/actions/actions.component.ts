import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'x-actions',
  imports: [
    ButtonComponent,
    IconButtonComponent,
  ],
  template: `
  <ng-container>
    <section class="flex justify-evenly gap-0 md:gap-4 -order-none md:order-last mb-4">
      <x-icon-button color="purple" materialIcon="schedule" />
      <x-icon-button color="cyan" materialIcon="content_copy" />
      <x-icon-button color="amber" materialIcon="edit" />
      <x-icon-button color="red" materialIcon="delete" />
    </section>
    <section class="flex justify-between gap-0 md:gap-4">
      <x-button class="min-w-[calc(50%_-_8px)]" color="green">
        <span slot="icon" class="material-symbols-outlined mr-4">
          calendar_month
        </span>
        Exportar
      </x-button>

      <x-button class="min-w-[calc(50%_-_8px)]" color="blue" (click)="createEvent()">
        <span class="material-symbols-outlined mr-4">
          add
        </span>
        Crear
      </x-button>
    </section>
  </ng-container>
  `
})

export class ActionsComponent {
  constructor(
    private readonly router: Router,
  ) {}

  createEvent() {
    this.router.navigate(['action'], {queryParams: {mode: 'new'}})
  }
}