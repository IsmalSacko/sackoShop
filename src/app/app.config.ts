import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'; // Nécessaire pour Toastr
import {provideToastr} from 'ngx-toastr';
import {routes} from './app.routes';
import {IonicModule} from '@ionic/angular';
import {provideIonicAngular} from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideIonicAngular(),
    importProvidersFrom(IonicModule.forRoot()), // ✅ Nouvelle façon d'ajouter Ionic
    provideAnimations(), // Ajouté pour Toastr
    provideToastr({
      //positionClass: 'toast-center-center', // ✅ Centrage total
      //timeOut: 4000,
      //progressBar: true,
      //closeButton: false,
    }),


  ]
};
