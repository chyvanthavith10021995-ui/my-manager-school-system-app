import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // បង្កើនកម្រិតកំណត់កុំឱ្យចេញ Warning (គិតជា kB)
    chunkSizeWarningLimit: 1600, 
    
    rollupOptions: {
      output: {
        // បែងចែកបណ្ណាល័យពី node_modules ឱ្យដាច់ដោយឡែកពីកូដកម្មវិធីយើង
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // អ្នកអាចបំបែកជា vendor ទូទៅ ឬបែងចែកតាមライブラリ (Library) ធំៗ
            return 'vendor';
          }
        },
      },
    },
  },
});