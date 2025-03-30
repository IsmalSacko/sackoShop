import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {HelpCenterComponent} from '../help-center/help-center.component';

import {IonButton, IonIcon} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {
  heart,
  logoApple,
  settingsSharp,
  star,
  chevronBack,
  cart,
  fileTray,
  shieldCheckmark,
  location, time, headset, shieldCheckmarkOutline, shieldCheckmarkSharp
} from 'ionicons/icons';


@Component({
  selector: 'app-user-profile',
  imports: [
    NgIf,
    IonIcon


  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: any = null;

  constructor(private modalCtrl: ModalController, private userService: ApiService, private router: Router) {
    addIcons({
      heart,
      cart,
      time,
      headset,
      fileTray,
      shieldCheckmark,
      shieldCheckmarkSharp,
      shieldCheckmarkOutline,

      logoApple, settingsSharp, star, chevronBack, location
    });
  }

  async ngOnInit() {
    this.user = await this.userService.getUserInfo();
  }

  async openHelpCenter() {
    console.log("🔹 Ouverture du modal Centre d'aide"); // ✅ Vérification en console

    const modal = await this.modalCtrl.create({
      component: HelpCenterComponent
    });

    await modal.present();
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }

  editProfile() {
    this.router.navigate(['/profile/edit']);
  }
}
