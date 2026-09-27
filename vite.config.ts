import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // កំណត់កម្រិត Warning ត្រឹម 1000kB បន្ទាប់ពីធ្វើការ Optimization
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // បែងចែក Bundle ជា Chunks ផ្សេងៗគ្នា តាម Folder ដើម្បីឱ្យ Load បានលឿន និងគ្មាន Warning
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) {
              return 'vendor-recharts';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor-core';
          }
          if (id.includes('src/mockData')) {
            return 'app-mockdata';
          }
          if (id.includes('src/components/')) {
            const match = id.match(/src\/components\/([^/]+)/);
            if (match && match[1]) {
              return `comp-${match[1]}`;
            }
            return 'app-components';
          }
        },
      },
    },
  },
});