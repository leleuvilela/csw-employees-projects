import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { employeesFeature } from './state/employees/employees.reducer';
import { EmployeesEffects } from './state/employees/employees.effects';
import { rolesFeature } from './state/roles/roles.reducer';
import { RolesEffects } from './state/roles/roles.effects';
import { platoonsFeature } from './state/platoons/platoons.reducer';
import { PlatoonsEffects } from './state/platoons/platoons.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState(employeesFeature),
    provideState(rolesFeature),
    provideState(platoonsFeature),
    provideEffects(EmployeesEffects, RolesEffects, PlatoonsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
