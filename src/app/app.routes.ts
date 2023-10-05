import { Routes, provideRouter } from '@angular/router';
import { IcalEventGeneratorLayout } from './ical-event-generator/ical-event-generator.layout';

const routes: Routes = [
  { path: '', loadChildren: () => import('./ical-event-generator/ical-event-generator.routes').then(m => m.routes) },
  { path: '**', redirectTo: '' }
]

export const AppRouter = provideRouter(routes)