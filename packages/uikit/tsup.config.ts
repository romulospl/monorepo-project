import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/main.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
    external: ['react', 'react-dom'],
  });
  
  