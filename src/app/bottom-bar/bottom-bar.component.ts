import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
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

  constructor(private apiService: CartService, private router: Router,) {
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

  toggleCart() {
    if (this.activeTab === 'cart') {
      // Si le panier est déjà actif, ne rien faire
      return;
    }

    this.isCartOpen = !this.isCartOpen; // Ouvre ou ferme le panier
    this.apiService.setCartOpenState(this.isCartOpen);
    this.setActiveTab('cart'); // Change l'onglet actif en "panier"
  }


  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.router.navigate([`/${tab}`]);


  }

  pageReload(): void {
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }
}
