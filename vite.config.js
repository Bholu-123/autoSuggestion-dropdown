import { defineConfig } from 'vite';

// This project keeps JSX inside `.js` files. Vite's default pipeline treats
// `.js` as plain JS, so we point esbuild at the source `.js` files with the
// JSX loader (both for dev transform and dependency pre-bundling).
export default defineConfig({
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
});
