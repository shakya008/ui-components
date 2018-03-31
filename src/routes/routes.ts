import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { pageRoutes } from '../containers/routes';

export const SAMPLE_APP_ROUTES: Routes = [
...pageRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(SAMPLE_APP_ROUTES);
