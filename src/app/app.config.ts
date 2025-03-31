import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'; // Nécessaire pour Toastr
import {provideToastr} from 'ngx-toastr';
import {routes} from './app.routes';
import {IonicModule} from '@ionic/angular';
import {provideIonicAngular} from '@ionic/angular/standalone';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { OrderService } from './services/order.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideIonicAngular({mode: 'ios'}),
    importProvidersFrom(IonicModule.forRoot()), // ✅ Nouvelle façon d'ajouter Ionic
    provideAnimations(), // Ajouté pour Toastr
    provideHttpClient(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
    OrderService
  ]
};
