import { Routes } from '@angular/router';
import { IcalEventGeneratorLayout } from './ical-event-generator.layout';
import { ActionFormComponent } from './components/action-form/action-form.component';

export const routes: Routes = [
  {
    path: '',
    component: IcalEventGeneratorLayout,
    children: [
      { path: 'action', component: ActionFormComponent }
    ]
  },
]