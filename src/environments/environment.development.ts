import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  cinetpay: {
    apiKey: 'CINETPAY_API_KEY',
    siteId: 'CINETPAY_SITE_ID'
  }
}; 