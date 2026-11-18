import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/sabana-asmi-portfolio/").
// Locally and on Vercel/Netlify it is unset, so the site is served from "/".
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
});
