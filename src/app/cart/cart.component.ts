import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {CartService} from '../services/cart.service';
import {CinetpayService} from '../services/cinetpay.service';
import {ApiService} from '../services/api.service';
import {OrderService} from '../services/order.service';
import {addIcons} from 'ionicons';
import {
  cartOutline,
  cardOutline,
  trashOutline,
  reloadOutline,
  removeOutline,
  addOutline
} from 'ionicons/icons';
import {environment} from '../../environments/environment';
import {Environment} from '../../environments/environment.interface';

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
  customer: any = null; // Stocker les infos de l'utilisateur
  /*  pageReload(): void {
      setTimeout(() => {
        window.location.reload();
      }, 0);
    }*/
  isReloading = false;  // Variable pour afficher ou non l'icône

  constructor(
    private apiService: CartService,
    private cinetpayService: CinetpayService,
    private userService: ApiService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {
    addIcons({
      cartOutline,
      cardOutline,
      trashOutline,
      reloadOutline,
      removeOutline,
      addOutline
    });
  }

  async ngOnInit() {
    try {
      await this.cinetpayService.loadCinetPayScript();
      const data = await this.apiService.getCartItems();
      this.apiService.setCartOpenState(true);

      if (data.cart && data.cart.cart_items) {
        this.cartItems = data.cart.cart_items;
        this.totalPrice = Math.round(data.cart.total_price) * 655.96;
      }
      this.customer = await this.userService.getUserInfo();
      console.log("Infos client :", this.customer);

      // Stocker l'adresse de l'utilisateur
      if (this.customer && this.customer.address) {
        localStorage.setItem('userAddress', this.customer.address);
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
    }
  }

  async payWithCinetPay() {
    if (!this.customer) {
      console.error('Impossible de procéder au paiement : infos client manquantes');
      alert('Veuillez vous connecter pour effectuer un paiement');
      return;
    }

    try {
      // Vérifier si l'utilisateur est authentifié
      const token = localStorage.getItem('authToken');
      console.log('Token d\'authentification:', token);

      if (!token) {
        alert('Veuillez vous connecter pour effectuer un paiement');
        return;
      }

      // Vérifier si l'adresse de livraison est disponible
      const userAddress = localStorage.getItem('userAddress');
      if (!userAddress) {
        alert('Veuillez compléter votre adresse de livraison');
        return;
      }

      // Créer la commande à partir du panier
      const order = await this.orderService.createOrderFromCart(this.cartItems, this.totalPrice);

      if (!order || !order.id) {
        throw new Error('La commande n\'a pas été créée correctement');
      }

      // Stocker l'ID de la commande pour référence future
      localStorage.setItem('currentOrderId', order.id.toString());

      // Configurer CinetPay
      this.cinetpayService.setConfig({
        apikey: (environment as Environment).cinetpay.apiKey,
        site_id: (environment as Environment).cinetpay.siteId,
        notify_url: `${environment.apiUrl}/notify`,
        mode: 'PRODUCTION'
      });

      // Préparer les données du checkout
      const checkoutData = {
        transaction_id: Math.floor(Math.random() * 100000000).toString(),
        amount: this.totalPrice,
        currency: 'XOF',
        channels: 'ALL',
        description: 'Services de livraison de marchandises',
        customer_name: this.customer.name || "Inconnu",
        customer_surname: this.customer.surname || "Inconnu",
        customer_email: this.customer.email || "inconnu@test.com",
        customer_phone_number: this.customer.phone || "000000000",
        customer_address: this.customer.address || "Adresse inconnue",
        customer_city: this.customer.city || "Ville inconnue",
        customer_country: (this.customer.country || 'ML').toUpperCase(),
        customer_state: this.customer.state || "Inconnu",
        customer_zip_code: this.customer.zip_code || "00000"
      };

      // Gérer la réponse du paiement
      this.cinetpayService.waitResponse((data: any) => {
        if (data.status === "REFUSED") {
          alert("Votre paiement a échoué");
          window.location.reload();
        } else if (data.status === "ACCEPTED") {
          alert("Votre paiement a été effectué avec succès");
          // Rediriger vers la page des commandes
          window.location.href = '/orders';
        }
      });

      // Gérer les erreurs
      this.cinetpayService.onError((data: any) => {
        console.error('Erreur CinetPay:', data);
        alert("Une erreur est survenue lors du paiement");
      });

      // Lancer le checkout
      this.cinetpayService.getCheckout(checkoutData);

    } catch (error: any) {
      console.error('Erreur lors du processus de paiement:', error);
      let errorMessage = "Une erreur est survenue lors de l'initialisation du paiement";

      if (error.response?.status === 404) {
        errorMessage = "Le service de commande n'est pas disponible. Veuillez réessayer plus tard.";
      } else if (error.response?.status === 401) {
        errorMessage = "Veuillez vous connecter pour effectuer un paiement";
      } else if (error.message === 'Non authentifié') {
        errorMessage = "Veuillez vous connecter pour effectuer un paiement";
      }

      alert(errorMessage);
    }
  }

  ngOnDestroy() {
    this.apiService.setCartOpenState(false); // Quand on quitte le panier, on remet à false
  }

  async increaseQuantity(item: CartItem) {
    item.quantity++;
    await this.apiService.updateCartItem(item.id, item.quantity);
    this.updateTotalPrice();
    this.pageReload()
  }

  // Méthode pour recharger la page après une action

  async decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      await this.apiService.updateCartItem(item.id, item.quantity);
      this.updateTotalPrice();
      this.pageReload()

    }
  }

  pageReload(): void {
    this.isReloading = true;  // Afficher l'icône de rechargement
    setTimeout(() => {
      window.location.reload();
    }, 800);  // Petit délai pour que l'icône s'affiche avant le rechargement
  }

  async removeItem(itemId: number) {
    const success = await this.apiService.removeCartItem(itemId);
    if (success) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      this.updateTotalPrice();
      this.pageReload()
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  updateTotalPrice() {
    this.totalPrice = this.getTotalPrice();
  }
}
