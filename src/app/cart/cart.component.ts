import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {CartService} from '../services/cart.service';
import {CinetpayService} from '../services/cinetpay.service';
import {ApiService} from '../services/api.service';
import {addIcons} from 'ionicons';
import {heart, trashOutline, reload} from 'ionicons/icons';

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
    private cdr: ChangeDetectorRef,
  ) {
    addIcons({
      trashOutline,
      reload,

    })
  }

  async ngOnInit() {
    this.loadCinetPayScript();
    try {
      const data = await this.apiService.getCartItems();
      this.apiService.setCartOpenState(true);

      if (data.cart && data.cart.cart_items) {
        this.cartItems = data.cart.cart_items;
        this.totalPrice = Math.round(data.cart.total_price) * 655.96
        ;
      }
      // Utiliser le service existant pour récupérer les infos utilisateur
      this.customer = await this.userService.getUserInfo();
      console.log("Infos client :", this.customer);
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
    }
  }

  async payWithCinetPay() {
    if (!this.customer) {
      console.error('Impossible de procéder au paiement : infos client manquantes');
      return;
    }

    const response = await this.cinetpayService.initiatePayment(this.totalPrice, this.customer);

    if (response && response.payment_url) {
      window.location.href = response.payment_url;  // Redirection vers la page de paiement CinetPay
    } else {
      console.error('Erreur lors de la redirection vers le paiement');
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

  // Fonction pour charger le script CinetPay
  loadCinetPayScript() {
    const script = document.createElement('script');
    script.src = 'https://cdn.cinetpay.com/seamless/main.js';
    script.onload = () => {
      console.log('CinetPay SDK chargé');
    };
    document.body.appendChild(script);
  }

  // Fonction de paiement
  checkout() {
    if ((window as any).CinetPay) {
      (window as any).CinetPay.setConfig({
        apikey: '130529916867e339d94902d2.07100155', // Ton APIKEY
        site_id: '105890727', // Ton SITE_ID
        notify_url: 'http://mondomaine.com/notify/',
        mode: 'PRODUCTION'
      });
      const transactionId = Math.floor(Math.random() * 100000000).toString();
      // Conversion en XOF et arrondi à l'entier le plus proche
      const customerCountry = (this.customer.country || 'ML').toUpperCase();
      //const amountInCFA = this.totalPrice * 655; // Conversion en XOF
      (window as any).CinetPay.getCheckout({
        transaction_id: transactionId, // ID de la transaction
        amount: this.totalPrice,
        currency: 'XOF',
        channels: 'ALL',
        description: 'Services de livraison de marchandises',
        customer_name: this.customer.name || "Inconnu", // Nom de l'utilisateur
        customer_surname: this.customer.surname || "Inconnu", // Prénom de l'utilisateur
        customer_email: this.customer.email || "inconnu@test.com", // Email de l'utilisateur
        customer_phone_number: this.customer.phone || "000000000", // Numéro de téléphone
        customer_address: this.customer.address || "Adresse inconnue", // Adresse de l'utilisateur
        customer_city: this.customer.city || "Ville inconnue", // Ville
        customer_country: customerCountry,
        customer_state: this.customer.state || "Inconnu", // État
        customer_zip_code: this.customer.zip_code || "00000", // Code postal
      });
      (window as any).CinetPay.waitResponse((data: any) => {
        if (data.status === "REFUSED") {
          alert("Votre paiement a échoué");
          window.location.reload();
        } else if (data.status === "ACCEPTED") {
          alert("Votre paiement a été effectué avec succès");
          window.location.reload();
        }
      });

      (window as any).CinetPay.onError((data: any) => {
        console.log(data);
      });
    }
  }
}
