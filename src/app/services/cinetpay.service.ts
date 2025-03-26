import {Injectable} from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CinetpayService {
  private apiUrl = 'https://api-checkout.cinetpay.com/v2/payment/';
  private apiKey = '127479106067e32d2f203b26.55174459';  // Ta clé API Cinetpay
  private siteId = '105890722';  // Ton site ID Cinetpay

  constructor() {
  }

  async initiatePayment(amount: number, customer: any): Promise<any> {
    const transactionId = Math.floor(Math.random() * 100000000).toString();

    // Création de l'objet de données en utilisant les infos client dynamiques
    const data = {
      apikey: this.apiKey,
      site_id: this.siteId,
      transaction_id: transactionId,
      amount: amount,  // Montant du paiement
      currency: 'EUR',
      channels: 'ALL',
      mode: 'PRODUCTION',
      description: "Achat sur Sacko Services",


      notify_url: "http://localhost:4200/cart",
      return_url: "http://localhost:4200/cart",
      metadata: "achat-client",
      lang: "FR",
    };

    try {
      const response = await axios.post(this.apiUrl, data, {
        headers: {'Content-Type': 'application/json'}
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'initiation du paiement :", error);
      return null;
    }
  }
}
