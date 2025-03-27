import {Component} from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reglages',
  imports: [
    FormsModule
  ],
  templateUrl: './reglages.component.html',
  styleUrl: './reglages.component.css'
})
export class ReglagesComponent {
  notificationsEnabled: boolean = true;  // Par défaut les notifications sont activées

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  goToProfile(route: string): void {

    this.router.navigate([route]);
  }

  changePassword(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    localStorage.removeItem('token');
    // Logique pour déconnecter l'utilisateur (effacer la session, etc.)
  }
}
