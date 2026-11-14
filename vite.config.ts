import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages sirve el sitio en /evolai/. panel.html se publica, pero solo lo ve el admin
// (rol en Supabase) y sus acciones necesitan la API local encendida en tu PC.
export default defineConfig(({command}) => ({
  base: command === 'build' ? '/evolai/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        curso: 'curso.html',
        privacidad: 'privacidad.html',
        panel: 'panel.html',
      },
    },
  },
}));
