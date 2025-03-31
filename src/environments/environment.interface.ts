export interface Environment {
  production: boolean;
  apiUrl: string;
  cinetpay: {
    apiKey: string;
    siteId: string;
  };
} 