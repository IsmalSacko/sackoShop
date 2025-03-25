import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {NgForOf, NgIf} from '@angular/common';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.apiService.getProducts().then(data => {
      this.products = data;
    });
  }


  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1);

  }
}
