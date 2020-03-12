import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    if ('serviceworker' in window.navigator && environment.production) {
      navigator.serviceWorker.register('/ngsw-workers.js');
    }
  })
  .catch(err => console.error(err));
