import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService, Order } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  orders: Order[] = [];
  searchOrderNumber: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    console.log('OrderTrackingComponent constructor');
  }

  async ngOnInit() {
    console.log('OrderTrackingComponent initialized');
    await this.loadOrders();
  }

  async loadOrders() {
    console.log('Loading orders...');
    try {
      this.loading = true;
      this.error = null;
      this.orders = await this.orderService.getOrders();
      console.log('Orders loaded successfully:', this.orders);
      if (this.orders.length === 0) {
        console.log('No orders found');
        this.toastr.info('Aucune commande trouvée');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      this.error = 'Erreur lors du chargement des commandes';
      this.toastr.error('Erreur lors du chargement des commandes');
      this.orders = [];
    } finally {
      this.loading = false;
      console.log('Loading state:', this.loading);
      console.log('Orders array length:', this.orders.length);
    }
  }

  async searchOrder() {
    console.log('Searching order:', this.searchOrderNumber);
    if (!this.searchOrderNumber.trim()) {
      console.log('Empty search query, loading all orders');
      await this.loadOrders();
      return;
    }

    try {
      this.loading = true;
      this.error = null;
      const order = await this.orderService.getOrderByNumber(this.searchOrderNumber);
      console.log('Order found:', order);
      this.orders = [order];
    } catch (error) {
      console.error('Error searching order:', error);
      this.error = 'Commande non trouvée';
      this.toastr.error('Commande non trouvée');
      this.orders = [];
    } finally {
      this.loading = false;
      console.log('Search completed, loading state:', this.loading);
      console.log('Orders array length:', this.orders.length);
    }
  }

  getStatusColor(status: Order['status']): string {
    const colors = {
      pending: 'warning',
      confirmed: 'primary',
      processing: 'info',
      shipped: 'secondary',
      delivered: 'success',
      cancelled: 'danger'
    };
    return colors[status] || 'secondary';
  }

  getStatusText(status: Order['status']): string {
    const labels = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      processing: 'En traitement',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    };
    return labels[status] || status;
  }
}
