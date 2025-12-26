# 💠 SPA Sci-Fi HUD - Modular Framework

> Uma arquitetura Single Page Application (SPA) leve, reativa e **"Plug & Play"** desenvolvida em Vanilla JS.

Este projeto não é apenas um template visual; é um **mini-framework** projetado para escalabilidade. Ele separa completamente a lógica de rotas (`Core`) da interface do usuário (`UI`), permitindo que desenvolvedores adicionem ou removam páginas inteiras sem nunca precisarem tocar no HTML da barra de navegação ou no roteador manualmente.

## Principais Diferenciais

* **Arquitetura Plug & Play:** O menu de navegação (Navbar) é gerado dinamicamente. Basta importar uma nova classe de página e o sistema cria o botão, a rota e a animação automaticamente.
* **Zero Dependências de Framework:** Construído com JavaScript moderno (ES Modules, Classes) e Vite. Performance nativa máxima.
* **Visual Sci-Fi Modular:** O sistema de design (`SciFiLayout`) envolve automaticamente qualquer conteúdo cru em cards futuristas com bordas neon e efeitos de vidro (`glassmorphism`), controlados por variáveis CSS.
* **Router Inteligente:** Gerenciamento de histórico e injeção de dependência lazy-load.

---

## Como usar o Framework

O sistema funciona baseada em **Registro de Módulos**. Você não edita o HTML para criar menus. Você cria componentes.

### 1. Criando uma Nova Página

Crie um arquivo na pasta `src/pages/`, por exemplo: `Dashboard.js`.
A classe deve estender `Component` e exportar `metadata`.

```javascript
// src/pages/Dashboard.js
import { Component } from '../core/Component.js';

export class Dashboard extends Component {
    // A Mágica acontece aqui: Configuração do Módulo
    static get metadata() {
        return { 
            path: '/dashboard',      // A URL
            label: 'Painel',         // O nome no Menu
            icon: 'fa-chart-line'    // Ícone (FontAwesome)
        };
    }

    render() {
        // Retorne HTML puro. O sistema aplicará o estilo Sci-Fi automaticamente.
        return `
            <h1>Painel de Controle</h1>
            <p>Dados em tempo real...</p>
        `;
    }
}
```

### 2. Registrando o Módulo
Vá até o arquivo principal src/main.js e registre sua nova página no App.
```javascript
// src/main.js
import { Dashboard } from './pages/Dashboard.js'; // 1. Importe

App.use(Home)
   .use(Sobre)
   .use(Dashboard); // 2. Adicione esta linha (Plug)
   
// Pronto! O botão "Painel" aparecerá na Navbar automaticamente.
```

### 3. Removendo uma Página
Para remover, basta apagar a linha .use(Dashboard). O botão some do menu e a rota deixa de existir. Simples assim.

## Personalização Visual (Theming)
O visual é controlado pelo "Motor CSS" em src/themes/.

Para mudar as cores de todo o sistema (ex: mudar de Azul Neon para Vermelho Alerta), edite apenas as variáveis no arquivo src/themes/neon-blue.css:

```css
:root {
    --primary-color: #ff0055; /* Muda a borda e brilho para vermelho */
    --card-shape: polygon(...); /* Muda o formato geométrico do corte */
}
```

## Estrutura do Projeto
```
src/
├── core/           # O Cérebro (Router, Component Base, App Engine)
├── components/     # Elementos de UI (Navbar Automática, Wrapper Sci-Fi)
├── pages/          # Suas Páginas (Módulos Plug & Play)
├── themes/         # Motores de Estilo (CSS Variables)
└── main.js         # Ponto de Entrada (Registro de Módulos)

```
## Instalação e Execução

```
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Rodar servidor de produção
npm run build
```