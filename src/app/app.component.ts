import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { App } from '@capacitor/app';
import { IonicModule } from '@ionic/angular';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { addIcons } from 'ionicons';
import { 
  personCircleOutline, 
  searchOutline, 
  cartOutline, 
  chevronBackOutline,
  homeOutline,
  listOutline,
  settingsOutline,
  helpCircleOutline
} from 'ionicons/icons';

// Ajouter toutes les icônes globalement
addIcons({
  'person-circle-outline': personCircleOutline,
  'search': searchOutline,
  'cart-outline': cartOutline,
  'chevron-back': chevronBackOutline,
  'home': homeOutline,
  'list': listOutline,
  'settings': settingsOutline,
  'help-circle': helpCircleOutline
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IonicModule, BottomBarComponent, TopBarComponent],
  template: `
    <app-top-bar></app-top-bar>
    <router-outlet></router-outlet>
    <app-bottom-bar></app-bottom-bar>
  `
})
export class AppComponent {
  title = 'sacko-shop';

  constructor() {
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp(); // Quitte l'application si on est sur la page principale
      }
    });
  }
}
