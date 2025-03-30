import {Component, OnInit} from '@angular/core';
import {IonicModule, NavController} from '@ionic/angular';
import {ApiService} from '../services/api.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  imports: [
    IonicModule,
    NgIf

  ],
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  user: any = null;

  constructor(private navCtrl: NavController, private userService: ApiService, private router: Router) {
  }

  openCart() {
    console.log("Ouverture du cart...");
  }

  openProfile() {
    this.router.navigate(['/profile']);
  }

  goToBack() {
    this.navCtrl.back();
  }


  async ngOnInit() {
    this.user = await this.userService.getUserInfo();
  }
}
