import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import axios from 'axios';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-rest-password',
  imports: [
    FormsModule
  ],
  templateUrl: './rest-password.component.html',
  styleUrl: './rest-password.component.css'
})
export class RestPasswordComponent {
  email: string = '';

  constructor(private toastr: ToastrService) {
  }

  onSubmit() {
    axios.post('http://127.0.0.1:8000/auth/users/reset_password/', {
      email: this.email
    })
      .then(response => {

        this.toastr.success('Un e-mail avec un lien de réinitialisation a été envoyé au ' + this.email + ' succès ✅', 'Succès', {
          toastClass: 'custom-toast custom-toast-success',
          positionClass: 'toast-center-center',
          timeOut: 2000,  // Affiche le toast pendant 2 secondes
          progressBar: true,
          closeButton: false
        });
      })
      .catch(error => {
        this.toastr.success("Erreur lors de l'envoi de l'e-mail de réinitialisation. Vérifiez l'e-mail", "Erreur", {
          toastClass: "custom-toast custom-toast-error",
          positionClass: "toast-center-center",
          timeOut: 10000,  // Affiche le toast pendant 2 secondes
          progressBar: true,
          closeButton: false
        });
        console.error(error.response.data);
      });
  }
}
