import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {IonicModule, ModalController} from '@ionic/angular';
import {HelpCenterComponent} from '../help-center/help-center.component';


@Component({
  selector: 'app-user-profile',
  imports: [
    NgIf,
    IonicModule


  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: any = null;

  constructor(private modalCtrl: ModalController, private userService: ApiService, private router: Router) {
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
