import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IcalEventGeneratorComponent } from './ical-event-generator.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    IcalEventGeneratorComponent
  ],
  template: `
    <x-ical-event-generator/>
    <router-outlet/>
  `,
})
export class IcalEventGeneratorLayout {
}
