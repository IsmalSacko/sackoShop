import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

export interface Order {
  id: number;
  order_number: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
  total_amount: string;
  shipping_address: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    image: string;
  };
}

export interface OrderItem {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    imageUrls: string[];
  };
  quantity: number;
  price: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = `${environment.apiUrl}/products/orders`;

  constructor() { }

  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    console.log('Token récupéré:', token);
    if (!token) {
      console.error('Aucun token d\'authentification trouvé');
      return null;
    }
    const headers = {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    };
    console.log('Headers générés:', headers);
    return headers;
  }

  async getOrders(): Promise<Order[]> {
    try {
      const headers = this.getAuthHeaders();
      if (!headers) {
        console.error('Impossible de récupérer les commandes : non authentifié');
        return [];
      }

      console.log('Tentative de récupération des commandes...');
      console.log('URL:', this.apiUrl);
      console.log('Headers:', headers);

      const response = await axios.get(this.apiUrl, { headers });
      
      console.log('Réponse reçue:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });

      return response.data;
    } catch (error: any) {
      console.error('Erreur lors de la récupération des commandes:', error);
      if (error.response) {
        console.error('Détails de l\'erreur:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      return [];
    }
  }

  async getOrderById(orderId: string): Promise<Order> {
    try {
      const headers = this.getAuthHeaders();
      if (!headers) {
        throw new Error('Non authentifié');
      }

      const response = await axios.get(`${this.apiUrl}/${orderId}/`, { headers });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la commande:', error);
      throw error;
    }
  }

  async getOrderByNumber(orderNumber: string): Promise<Order> {
    try {
      const headers = this.getAuthHeaders();
      if (!headers) {
        throw new Error('Non authentifié');
      }

      const response = await axios.get(`${this.apiUrl}/track/${orderNumber}/`, { headers });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de la commande:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    try {
      const headers = this.getAuthHeaders();
      if (!headers) {
        throw new Error('Non authentifié');
      }

      const response = await axios.patch(
        `${this.apiUrl}/${orderId}/status/`,
        { status },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  }

  isPaymentInProgress(): boolean {
    return localStorage.getItem('paymentInProgress') === 'true';
  }

  clearPaymentStatus(): void {
    localStorage.removeItem('paymentInProgress');
  }

  async createOrderFromCart(cartItems: any[], totalAmount: number): Promise<Order> {
    try {
      const headers = this.getAuthHeaders();
      if (!headers) {
        throw new Error('Non authentifié');
      }

      // Récupérer l'adresse de l'utilisateur depuis le localStorage
      const userAddress = localStorage.getItem('userAddress');
      if (!userAddress) {
        throw new Error('Adresse de livraison manquante');
      }

      const orderData = {
        order_items: cartItems.map(item => ({
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total_amount: totalAmount,
        shipping_address: userAddress
      };

      console.log('Création de la commande avec les données:', orderData);
      console.log('URL:', `${this.apiUrl}/`);
      console.log('Headers:', headers);

      const response = await axios.post(`${this.apiUrl}/`, orderData, { headers });
      console.log('Réponse du serveur:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Erreur lors de la création de la commande:', error);
      if (error.response) {
        console.error('Détails de l\'erreur:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      throw error;
    }
  }
}
