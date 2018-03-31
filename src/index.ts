import './polyfills.browser';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

if (process.env.NODE_ENV !== 'test') {
    platformBrowserDynamic().bootstrapModule(AppModule);
}
