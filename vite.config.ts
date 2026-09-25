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
            if (id.includes('recharts')) {
              return 'vendor-recharts';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'vendor-react';
            }
            return 'vendor'; // លំនាំដើមសម្រាប់បណ្ណាល័យផ្សេងៗ
          }
        },
      },
    },
  },
});