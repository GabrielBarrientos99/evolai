import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages sirve el sitio en /evolai/. El panel (panel.html) solo existe en `npm run dev`:
// no se incluye en el build público porque habla con la API local de tu PC.
export default defineConfig(({command}) => ({
  base: command === 'build' ? '/evolai/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        curso: 'curso.html',
        privacidad: 'privacidad.html',
      },
    },
  },
}));
