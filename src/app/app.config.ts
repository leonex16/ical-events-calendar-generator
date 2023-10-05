import { ApplicationConfig } from '@angular/core';
import { AppRouter } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    AppRouter
  ]
};
