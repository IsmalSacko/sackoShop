import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-politiques-retour',
  imports: [
    IonicModule
  ],
  templateUrl: './politiques-retour.component.html',
  styleUrl: './politiques-retour.component.css'
})
export class PolitiquesRetourComponent {
  constructor(private router: Router) {
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }
}
