import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { Environment } from '../../environments/environment.interface';

export interface CinetPayConfig {
  apikey: string;
  site_id: string;
  notify_url: string;
  mode: 'PRODUCTION' | 'TEST';
}

export interface CinetPayCheckout {
  transaction_id: string;
  amount: number;
  currency: string;
  channels: string;
  description: string;
  customer_name: string;
  customer_surname: string;
  customer_email: string;
  customer_phone_number: string;
  customer_address: string;
  customer_city: string;
  customer_country: string;
  customer_state: string;
  customer_zip_code: string;
}

@Injectable({
  providedIn: 'root'
})
export class CinetpayService {
  private readonly apiUrl = 'https://api-checkout.cinetpay.com/v2/payment/';
  private readonly apiKey = (environment as Environment).cinetpay.apiKey;
  private readonly siteId = (environment as Environment).cinetpay.siteId;

  constructor(private http: HttpClient) {}

  loadCinetPayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).CinetPay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.cinetpay.com/seamless/main.js';
      script.onload = () => {
        console.log('CinetPay SDK chargé');
        resolve();
      };
      script.onerror = (error) => {
        console.error('Erreur lors du chargement du SDK CinetPay:', error);
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  setConfig(config: CinetPayConfig): void {
    if ((window as any).CinetPay) {
      (window as any).CinetPay.setConfig(config);
    }
  }

  initiatePayment(amount: number, customer: any): Observable<any> {
    const transactionId = Math.floor(Math.random() * 100000000).toString();
    const data = {
      apikey: this.apiKey,
      site_id: this.siteId,
      transaction_id: transactionId,
      amount: amount,
      currency: 'XOF',
      channels: 'ALL',
      mode: 'PRODUCTION',
      description: "Achat sur Sacko Services",
      notify_url: `${environment.apiUrl}/notify`,
      return_url: `${environment.apiUrl}/cart`,
      metadata: "achat-client",
      lang: "FR",
    };

    return this.http.post(this.apiUrl, data);
  }

  getCheckout(checkoutData: CinetPayCheckout): void {
    if ((window as any).CinetPay) {
      (window as any).CinetPay.getCheckout(checkoutData);
    }
  }

  waitResponse(callback: (data: any) => void): void {
    if ((window as any).CinetPay) {
      (window as any).CinetPay.waitResponse(callback);
    }
  }

  onError(callback: (data: any) => void): void {
    if ((window as any).CinetPay) {
      (window as any).CinetPay.onError(callback);
    }
  }
}
