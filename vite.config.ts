import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  optimizeDeps: {
    exclude: ['@ionic/angular', '@ionic/core', 'ionicons'],
  },
});
