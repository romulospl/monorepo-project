// vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `main.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json', // Caminho para o arquivo tsconfig.json
      outDir: 'dist', // Diretório de saída dos arquivos de definição de tipos
    }),
  ],
});