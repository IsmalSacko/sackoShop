import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CartService} from '../services/cart.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  templateUrl: './bottom-bar.component.html',
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {
  activeTab: string = 'home';
  cartItems: any[] = [];
  isCartOpen: boolean = false;

  constructor(private apiService: CartService) {
  }

  async ngOnInit() {
    try {
      this.apiService.isCartOpen.subscribe((isOpen) => {
        this.isCartOpen = isOpen;

      });


      const data = await this.apiService.getCartItems();

      if (data.cart && data.cart.cart_items) {
        this.cartItems = data.cart.cart_items;

      }
    } catch (error) {
    }
  }

  // Fonction pour gérer l'état ouvert/fermé du panier
  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    this.apiService.setCartOpenState(this.isCartOpen);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
