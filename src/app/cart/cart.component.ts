import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import { CartService } from '../services/cart.service';

interface CartItem {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
    imageUrls: string[];
  };
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [
    IonicModule,
    NgIf,
    NgForOf,
    DecimalPipe
  ],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private apiService: CartService) {}

  async ngOnInit() {
    try {
      const data = await this.apiService.getCartItems();
      this.apiService.setCartOpenState(true);

      if (data.cart && data.cart.cart_items) {
        this.cartItems = data.cart.cart_items;
        this.totalPrice = data.cart.total_price;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
    }
  }
  ngOnDestroy() {
    this.apiService.setCartOpenState(false); // Quand on quitte le panier, on remet à false
  }
  async increaseQuantity(item: CartItem) {
    item.quantity++;
    await this.apiService.updateCartItem(item.id, item.quantity);
    this.updateTotalPrice();
  }

  async decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      await this.apiService.updateCartItem(item.id, item.quantity);
      this.updateTotalPrice();
    }
  }

  async removeItem(itemId: number) {
    const success = await this.apiService.removeCartItem(itemId);
    if (success) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      this.updateTotalPrice();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  updateTotalPrice() {
    this.totalPrice = this.getTotalPrice();
  }

  checkout() {
    alert('Commande validée ! 🛒✅');
  }
}
