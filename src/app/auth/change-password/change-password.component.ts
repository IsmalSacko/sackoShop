import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router'; // Assurez-vous d'avoir un service API qui gère les appels au backend

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    // Créer le formulaire avec des validations
    this.passwordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    const {current_password, new_password, confirmPassword} = this.passwordForm.value;

    // Vérifier si le nouveau mot de passe et la confirmation sont identiques
    if (new_password !== confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    try {
      // Appel de l'API pour changer le mot de passe
      await this.apiService.changePassword(current_password, new_password);

      // Afficher le message de succès
      this.successMessage = 'Mot de passe modifié avec succès ! Redirection...';

      // Réinitialiser le formulaire
      this.passwordForm.reset();

      // Attendre 2 secondes (2000ms) avant de rediriger vers la page de connexion
      setTimeout(() => {
        this.apiService.logout()
      }, 2000);

    } catch (error) {
      this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
    }
  }

  gotoresetpassword(route: String) {
    this.router.navigate([route]);
  }


}
