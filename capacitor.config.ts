import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'sacko-shop',
  webDir: 'dist/sacko-shop/browser', // ← Ajoute "/browser" si le build continue à le mettre là
};

export default config;
