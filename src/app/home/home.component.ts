import {IonicModule} from '@ionic/angular';
import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router'; // Ajoute Router pour la navigation
import {DecimalPipe, NgForOf} from '@angular/common';
import {ApiService} from '../services/api.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {CartService} from '../services/cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    DecimalPipe,
    RouterLink,
    IonicModule

// Ajout de Router ici pour gérer la navigation
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('500ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  featuredProducts: any[] = [];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private cartService: CartService
  ) {
  }  // Injection de Router

  ngOnInit() {
    this.apiService.getCategories().then(data => {
      this.categories = data;
    });

    this.apiService.getProducts().then(data => {
      this.featuredProducts = data.slice(0, 4);
    });
  }

  // Fonction pour ajouter un produit au panier
  addToCart(productId: number) {
    this.cartService.addToCart(productId).then(response => {
    });
  }
}
