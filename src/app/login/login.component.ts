import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {Router, RouterLink} from '@angular/router';
import { NotificationService } from '../services/notification.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  successMessage: string | null = null;

  constructor(
    private authService: ApiService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    // Écoute les messages de succès
    this.notificationService.currentMessage.subscribe(message => {
      if (message?.type === 'success') {
        this.successMessage = message.text;
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/home']); // Redirection après 3 secondes
        }, 2000);
      }
    });
  }

  async login() {
    if (!this.username || !this.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.loading = true;
    try {
      await this.authService.login(this.username, this.password);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    } finally {
      this.loading = false;
    }
  }
}
