import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {DecimalPipe, Location, NgForOf} from '@angular/common';
import {CartService} from '../services/cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-category-list-products',
  imports: [
    DecimalPipe,
    NgForOf
  ],
  templateUrl: './category-list-products.component.html',
  styleUrl: './category-list-products.component.css'
})
export class CategoryListProductsComponent implements OnInit {
  categoryId!: number;
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location) {
  }

  async ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.products = await this.apiService.getProductsByCategory(this.categoryId);
  }

  goBack() {
    this.location.back();
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1);

  }
}
