import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import axios from 'axios';

@Component({
  selector: 'app-password-reset-confirm',
  imports: [
    FormsModule
  ],
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.css'
})
export class PasswordResetConfirmComponent implements OnInit {
  newPassword: string = '';
  uid: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.token = this.route.snapshot.paramMap.get('token')!;
    console.log(this.uid);

  }

  onSubmit() {
    axios.post('http://127.0.0.1:8000/auth/users/reset_password_confirm/', {
      uid: this.uid,
      token: this.token,
      new_password: this.newPassword
    })
      .then(response => {
        this.toastr.success('Mot de passe réinitialisé avec succès ✅', 'Succès', {
          toastClass: 'custom-toast custom-toast-success',
          positionClass: 'toast-center-center',
          timeOut: 2000,  // Affiche le toast pendant 2 secondes
          progressBar: true,
          closeButton: false
        });

        // Redirection après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      })
      .catch(error => {
        this.toastr.error(
          'Erreur lors de la réinitialisation du mot de passe. Ce token a déjà été utilisé ou est invalide.',
          'Erreur',
          {
            toastClass: 'custom-toast custom-toast-error',
            positionClass: 'toast-center-center',
            timeOut: 10000,  // Affichage pendant 5 secondes
            progressBar: true,
            closeButton: false
          }
        );
        console.error(error.response.data);
      });
  }

}
