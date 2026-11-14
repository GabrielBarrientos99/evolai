import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages sirve el sitio en /evolai/. panel.html se publica, pero solo lo ve el admin
// (rol en Supabase) y sus acciones necesitan la API local encendida en tu PC.
export default defineConfig(({command}) => ({
  base: command === 'build' ? '/evolai/' : '/',
  plugins: [react()],
  // En dev, escanear todas las páginas al arrancar evita recargas y el error de "dos copias de React".
  optimizeDeps: {entries: ['index.html', 'curso.html', 'privacidad.html', 'panel.html', 'automatizacion.html']},
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        curso: 'curso.html',
        privacidad: 'privacidad.html',
        panel: 'panel.html',
        automatizacion: 'automatizacion.html',
      },
    },
  },
}));
