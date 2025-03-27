import {Injectable} from '@angular/core';
import axios from 'axios';
import {NotificationService} from "./notification.service";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/';
  private loginUrl = 'http://localhost:8000/auth/token/';
  private userUrl = 'http://localhost:8000/auth/users/'; //


  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  async getProducts() {
    try {
      const response = await axios.get(this.apiUrl + 'products/');
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }


  async getCategories() {
    try {
      const response = await axios.get(this.apiUrl + 'products/categories/home/');
      return response.data;
    } catch (error) {
      console.log('Erreur de la récupéreation des catégories', error);
      return [];
    }
  }

  async getMarques() {
    try {
      const response = await axios.get(this.apiUrl + 'products/marques/');
      return response.data;
    } catch (error) {
      console.error('Eurreu de la récupération des marques', error);
      return [];
    }
  }

  async getProductsByCategory(categoryId: number) {
    try {
      const response = await axios.get(`${this.apiUrl}products/category/?category=${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits de la catégorie", error);
      return [];
    }
  }

  // Méthode de-'inscription

  register(username: string, email: string, password: string) {
    return axios.post(this.userUrl, {username, email, password});
  }

  // Méthode d'authentification
  login(username: string, password: string): Promise<any> {
    return axios.post(`${this.loginUrl}login`, {username, password})
      .then(response => {
        if (response.data.auth_token) {
          localStorage.setItem('authToken', response.data.auth_token)
          console.log('Token', response.data.auth_token);
          this.notificationService.showMessage('success', 'Connexion réussie ! 🎉');
          return response.data;
        } else {
          throw new Error('Échec de l\'authentification');
        }
      })
      .catch(error => {
        this.notificationService.showMessage('error', 'Nom d\'utilisateur ou mot de passe incorrect ❌');
        throw error.response ? error.response.data.message : 'Erreur de connexion';
      });
  }

  async getUserInfo(): Promise<any> {
    try {
      const token = localStorage.getItem('authToken'); // Récupérer le token stocké
      if (!token) {
        throw new Error('Token non trouvé');
      }

      const response = await axios.get(this.userUrl + 'me', {
        headers: {Authorization: `Token ${token}`}
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur', error);
      return null;
    }
  }

  async changePassword(current_password: string, new_password: string) {
    try {
      const response = await axios.post(
        `${this.userUrl}set_password/`,
        {current_password, new_password},
        {headers: {Authorization: `Token ${localStorage.getItem('authToken')}`}}
      );
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      throw axios.isAxiosError(error) ? error.response?.data || 'Erreur inconnue' : 'Une erreur inattendue est survenue';
    }
  }


  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);

  }
}
