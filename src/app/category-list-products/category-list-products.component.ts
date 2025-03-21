import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../services/api.service';
import {DecimalPipe, NgForOf, Location} from '@angular/common';

@Component({
  selector: 'app-category-list-products',
  imports: [
    DecimalPipe,
    NgForOf
  ],
  templateUrl: './category-list-products.component.html',
  styleUrl: './category-list-products.component.css'
})
export class CategoryListProductsComponent  implements OnInit {
  categoryId!: number;
  products: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService,private location: Location) {}

  async ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.products = await this.apiService.getProductsByCategory(this.categoryId);
  }

  goBack() {
    this.location.back();
  }

}
