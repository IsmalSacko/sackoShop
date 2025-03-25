import {Injectable} from '@angular/core';
import axios from 'axios';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router'; // Exemple, adapte à ton service de notifications.

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl: string = 'http://127.0.0.1:8000/api/products/';
  private isCartOpenSubject = new BehaviorSubject<boolean>(false); // Initial state is false
  isCartOpen = this.isCartOpenSubject.asObservable();

  constructor(private toastr: ToastrService, private router: Router) {
  }

  // Fonction pour changer l'état du panier (ouvert/fermé)
  setCartOpenState(isOpen: boolean) {
    this.isCartOpenSubject.next(isOpen);
  }

  // Récupérer les articles du cart
  async getCartItems() {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${this.apiUrl}cart/`, {
        headers: {Authorization: `Token ${token}`}
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des articles du cart', error);
      return [];
    }
  }

  // Ajouter un produit au cart
  async addToCart(product_id: number, quantity: number = 1) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${this.apiUrl}cart/add/`, {product_id, quantity},
        {headers: {Authorization: `Token ${token}`}}
      );
      if (response.data) {
        this.toastr.success('Ajouté au panier avec succès ✅', 'Succès', {
          toastClass: 'custom-toast custom-toast-success',
          positionClass: 'toast-center-center',
          timeOut: 5000,
          progressBar: true,
          closeButton: true
        });
        setTimeout(() => {


          window.location.reload();

        }, 1000);

        // Crée un délai avant de recharger la page (discrètement)

        return response.data;
      }
    } catch (error) {
      this.toastr.error("Erreur lors de l'ajout au panier", "Erreur", {
        toastClass: 'custom-toast custom-toast-error',
        positionClass: 'toast-center-center',
        timeOut: 5000,
        progressBar: true,
        closeButton: true
      });
      return null;
    }
  }

  // Mettre à jour la quantité d'un article dans le cart
  async updateCartItem(item_id: number, quantity: number) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(`${this.apiUrl}cart/update/${item_id}/`,
        {quantity},
        {headers: {Authorization: `Token ${token}`}}
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du cart', error);
      return null;
    }
  }

  // Supprimer un article du cart
  async removeCartItem(item_id: number) {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${this.apiUrl}cart/remove/${item_id}/`, {
        headers: {Authorization: `Token ${token}`}
      });
      console.log(item_id)
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression du cart', error);
      return false;
    }
  }

  // Calculer le total du cart
  async getTotalPrice() {
    try {
      const cartItems = await this.getCartItems();
      return cartItems.reduce((total: number, item: any) => total + item.total_price, 0);
    } catch (error) {
      console.error('Erreur lors du calcul du prix total', error);
      return 0;
    }
  }
}
