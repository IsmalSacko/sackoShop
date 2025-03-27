import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import axios from 'axios';
import {ToastrService} from 'ngx-toastr';
import {Keyboard} from '@capacitor/keyboard';

Keyboard.addListener('keyboardWillShow', info => {
  console.log('keyboard will show with height:', info.keyboardHeight);
});

Keyboard.addListener('keyboardDidShow', info => {
  console.log('keyboard did show with height:', info.keyboardHeight);
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('keyboard will hide');
});

Keyboard.addListener('keyboardDidHide', () => {
  console.log('keyboard did hide');
});

@Component({
  selector: 'app-editprofile',
  standalone: true, // ✅ Mode standalone
  imports: [FormsModule], // Pas besoin de CommonModule
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  user: any = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    image: null
  };

  constructor(private toastr: ToastrService) {
  }

  // Fonction pour ouvrir le clavier
  async openKeyboard() {
    await Keyboard.show();
  }

  // Fonction pour fermer le clavier
  async closeKeyboard() {
    await Keyboard.hide();
  }

  ngOnInit() {
    this.getUserInfo();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.image = file;

      // 🔄 Prévisualisation de l'image sélectionnée
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);

      console.log("Image sélectionnée :", file);
    }
  }

  async getUserInfo() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error("Aucun token trouvé, connexion requise.");
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/auth/users/me/', {
        headers: {Authorization: `Token ${token}`}
      });

      this.user = response.data;

      // Charger l'image actuelle si disponible
      if (this.user.image) {
        this.user.previewImage = this.user.image;
      }
    } catch (error) {
      console.error('Erreur de récupération des infos utilisateur', error);
    }
  }

  async updateProfile() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error("Aucun token trouvé, connexion requise.");
        return;
      }

      const formData = new FormData();
      formData.append('first_name', this.user.first_name);
      formData.append('last_name', this.user.last_name);
      formData.append('email', this.user.email);
      formData.append('phone', this.user.phone);
      formData.append('address', this.user.address);

      if (this.user.image instanceof File) {
        formData.append('image', this.user.image);
      }

      console.log("Données envoyées :", formData);

      const response = await axios.patch('http://127.0.0.1:8000/auth/users/me/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`
        }
      });

      console.log("Réponse complète du serveur :", response);
      console.log("Données retournées :", response.data);

      this.toastr.success('Profil mis à jour avec succès ✅', 'Succès', {
        toastClass: 'custom-toast custom-toast-success',
        positionClass: 'toast-center-center',
        timeOut: 5000,
        progressBar: true,
        closeButton: false
      });

    } catch (error) {
      console.error('Erreur lors de la mise à jour', error);
      // @ts-ignore
      const errorMessage = error.response?.data?.detail || "Une erreur s'est produite ❌";

      this.toastr.error(errorMessage, 'Erreur', {
        toastClass: 'custom-toast custom-toast-error',
        positionClass: 'toast-center-center',
        timeOut: 5000,
        progressBar: true,
        closeButton: false
      });
    }
  }
}
