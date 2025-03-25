import { Component } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Router, RouterLink} from '@angular/router';
import {NotificationService} from '../services/notification.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(
    private authService: ApiService,
  private router: Router,
  private notificationService: NotificationService
  ) { }

  async register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    try {
      await this.authService.register(this.username, this.email, this.password);
      this.successMessage = "Inscription réussie ! Redirection...";
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirige après 3 secondes
      }, 3000);
    } catch (error) {
      // @ts-ignore
      this.errorMessage = error.response ? error.response.data.message : "Erreur lors de l'inscription.";
    } finally {
      this.loading = false;
    }
  }

}
