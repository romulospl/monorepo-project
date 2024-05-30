# Sem título

# **Monorepo Project**

Este projeto demonstra a criação e configuração de um monorepo utilizando pnpm, incluindo a criação de um UI Kit e sua utilização em um aplicativo web. Abaixo está um guia passo a passo para configurar e executar o projeto.

## **Estrutura do Projeto**

```lua
luaCopiar código
monorepo-project/
  ├── packages/
  │   └── uikit/
  │       ├── src/
  │       │   ├── components/
  │       │   │   └── Button/
  │       │   │       └── index.tsx
  │       │   └── main.ts
  │       ├── tsup.config.ts
  │       ├── vite.config.ts
  │       ├── package.json
  ├── apps/
  │   └── web-app/
  │       ├── src/
  │       ├── package.json
  ├── package.json
  ├── pnpm-lock.yaml
  ├── pnpm-workspace.yaml
  ├── .gitignore

```

## **Passos para Configuração**

### **1. Criação do Workspace**

```
shCopiar código
mkdir monorepo-project
cd monorepo-project
pnpm init

```

### **2. Inicializando o Git e Configurando o Projeto**

```
shCopiar código
git init
echo -e "node_modules" > .gitignore
npm pkg set type="module"

```

### **3. Criando Estrutura de Pastas**

```
shCopiar código
mkdir packages apps

```

### **4. Criando o UI Kit**

```
shCopiar código
cd packages
pnpm create vite

```

Dentro da pasta **`uikit/src`**, crie o componente **`Button`**:

```tsx
tsxCopiar código
// uikit/src/components/Button/index.tsx
export default function ButtonTeste() {
  return (
    <>
      <div style={{ backgroundColor: 'green', borderRadius: '25px', padding: '10px' }}>Button</div>
    </>
  );
}

```

### **5. Configurando o Build do UI Kit**

Instale o plugin DTS:

```
shCopiar código
pnpm add -D vite-plugin-dts

```

Crie o arquivo **`vite.config.ts`**:

```
tsCopiar código
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
      tsconfigPath: './tsconfig.json',
      outDir: 'dist',
    }),
  ],
});

```

### **6. Configurando o Workspace**

Crie o arquivo **`pnpm-workspace.yaml`** na raiz do projeto:

```yaml
yamlCopiar código
packages:
  - 'apps/*'
  - 'packages/*'

```

### **7. Configurando o Web App**

No arquivo **`package.json`** do **`web-app`**, adicione a dependência do **`uikit`**:

```json
jsonCopiar código
"dependencies": {
  "uikit": "workspace:*"
}

```

Atualize o **`App.tsx`** do **`web-app`**:

```tsx
tsxCopiar código
// web-app/src/App.tsx
import { ButtonTeste } from "uikit";

function App() {
  return (
    <>
      <ButtonTeste />
    </>
  );
}

export default App;

```

### **8. Publicando o UI Kit no GitHub Package Registry**

Crie um arquivo **`.npmrc`** na raiz do **`uikit`**:

```
plaintextCopiar código
@seuNomeDeUsuario:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=SeuToken

```

Crie um arquivo **`.npmignore`**:

```
plaintextCopiar código
# Ignore everything
*

# Mas não ignore a pasta dist
!dist

# Inclua também arquivos importantes
!package.json
!README.md

```

Atualize o **`package.json`** do **`uikit`**:

```json
jsonCopiar código
{
  "name": "@seuNomeDeUsuario/uikit",
  "private": false,
  ...
}

```

Publique o pacote:

```
shCopiar código
npm publish --registry=https://npm.pkg.github.com

```

Acesse [https://github.com/seuNomeDeUsuario?tab=packages](https://github.com/seuNomeDeUsuario?tab=packages) para verificar a publicação.

### **9. Utilizando o UI Kit em Outro Projeto**

Crie um novo projeto **`use-component`** fora do **`monorepo-project`**:

```
shCopiar código
pnpm create vite use-component
cd use-component
pnpm install

```

Adicione um arquivo **`.npmrc`** na raiz do **`use-component`**:

```
plaintextCopiar código
@seuNomeDeUsuario:registry=https://npm.pkg.github.com

```

Instale o pacote **`uikit`**:

```
shCopiar código
pnpm install @seuNomeDeUsuario/uikit@0.0.0

```

Atualize o **`App.tsx`**:

```tsx
tsxCopiar código
// use-component/src/App.tsx
import './App.css';
import { ButtonTeste } from '@seuNomeDeUsuario/uikit';

function App() {
  return (
    <>
      <ButtonTeste />
    </>
  );
}

export default App;

```

Execute a aplicação:

```
shCopiar código
pnpm run dev

```

Você verá o botão do UI Kit em funcionamento na tela.