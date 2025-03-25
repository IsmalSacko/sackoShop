import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'sacko-shop',
  webDir: 'dist/sacko-shop/browser',
  // ← Ajoute "/browser" si le build continue à le mettre là
  server: {
    url: 'http://10.192.59.26:4200',  // 🚀 Active le Live Reload
    //cleartext: true  // Permet d'accéder au serveur en HTTP (sinon besoin de SSL)
  }
};

export default config;
