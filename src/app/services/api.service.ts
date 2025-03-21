import { Injectable } from '@angular/core';
import axios from 'axios';
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:8000/api/';
    private loginUrl = 'http://localhost:8000/auth/token/';

  constructor(private notificationService: NotificationService) {
  }

  async getProducts() {
        try {
          const response = await axios.get(this.apiUrl + 'products/');
          return response.data;
        }catch(e) {
          console.log(e);
          return [];
        }
    }


    async getCategories(){
       try {
         const response = await axios.get(this.apiUrl + 'products/categories/home/');
         return response.data;
       }catch (error){
         console.log('Erreur de la récupéreation des catégories', error);
         return [];
       }
    }

    async getMarques(){
    try {
      const response = await axios.get(this.apiUrl + 'products/marques/');
      return response.data;
    }catch (error){
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

    // Méthode d'authentification
    login(username: string, password: string): Promise<any> {
        return axios.post(`${this.loginUrl}login`, { username, password })
            .then(response => {
                if (response.data.auth_token) {
                    localStorage.setItem('authToken', response.data.auth_token)
                    //console.log('Token', response.data.auth_token);
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

    logout(): void {
        localStorage.removeItem('authToken');
    }
}
