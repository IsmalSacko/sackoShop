import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CurrencyPipe, DecimalPipe, NgForOf} from '@angular/common';
import {ApiService} from '../services/api.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NgForOf,
    DecimalPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  featuredProducts: any[] = [];

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getCategories().then(data => {
      this.categories = data;
      // convertir price en cfa


    });
    this.apiService.getProducts().then(data => {
      this.featuredProducts = data.slice(0, 4);
    });
  }
}
