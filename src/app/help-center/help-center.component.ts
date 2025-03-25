import {Component, OnInit} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-help-center',
  standalone: true, // ✅ Ajout de standalone
  templateUrl: './help-center.component.html',
  imports: [
    IonicModule,
    CommonModule,
  ],
  styleUrls: ['./help-center.component.css']
})


export class HelpCenterComponent  {
  constructor(private router: Router) {}

  goToFAQ(section: string) {
    this.router.navigate(['/faq', section]);
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }
}
