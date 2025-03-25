import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { App } from '@capacitor/app';
import {IonicModule} from '@ionic/angular';
import {BottomBarComponent} from './bottom-bar/bottom-bar.component';
import {TopBarComponent} from './top-bar/top-bar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IonicModule, BottomBarComponent, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
