import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', 'VITE_');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // Split vendor chunks for better caching
              'vendor-react': ['react', 'react-dom'],
              'vendor-three': ['three', '@react-three/fiber'],
              'vendor-motion': ['framer-motion'],
              'vendor-supabase': ['@supabase/supabase-js'],
              'vendor-icons': ['lucide-react'],
            },
          },
        },
        // Increase chunk size warning limit (still aim to optimize)
        chunkSizeWarningLimit: 600,
      },
    };
});
