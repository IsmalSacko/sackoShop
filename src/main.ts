import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { 
  personCircleOutline, 
  searchOutline, 
  cartOutline, 
  chevronBackOutline,
  homeOutline,
  listOutline,
  settingsOutline,
  helpCircleOutline,
  warningOutline,
  timeOutline,
  locationOutline,
  cashOutline,
  chevronForward,
  cardOutline,
  trashOutline,
  reloadOutline,
  removeOutline,
  addOutline
} from 'ionicons/icons';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';

// Ajouter toutes les icônes globalement avec des noms uniques
addIcons({
  'person-circle-icon': personCircleOutline,
  'search-icon': searchOutline,
  'cart-icon': cartOutline,
  'chevron-back-icon': chevronBackOutline,
  'home-icon': homeOutline,
  'list-icon': listOutline,
  'settings-icon': settingsOutline,
  'help-circle-icon': helpCircleOutline,
  'warning-icon': warningOutline,
  'time-icon': timeOutline,
  'location-icon': locationOutline,
  'cash-icon': cashOutline,
  'chevron-forward-icon': chevronForward,
  'card-icon': cardOutline,
  'trash-icon': trashOutline,
  'reload-icon': reloadOutline,
  'remove-icon': removeOutline,
  'add-icon': addOutline
});

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    provideHttpClient(),
    provideIonicAngular({ mode: 'ios' })
  ]
}).catch((err) => console.error(err));
