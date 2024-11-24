import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { errorMessages } from './configs/error-tailor.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideErrorTailorConfig({
      errors: {
        useValue: errorMessages
      },
      controlCustomClass: ['hello']
    })
  ],
};
