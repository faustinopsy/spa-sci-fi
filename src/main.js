import './style.css';
import { SciFiLayout } from './components/SciFiLayout.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const homeContent = document.createElement('div');
    homeContent.innerHTML = `
        <h1>Sistema Inicializado</h1>
        <p>A arquitetura modular visual está ativa.</p>
        <br>
        <p style="font-size: 0.8em; opacity: 0.8;">:: ACCESS GRANTED ::</p>
        <div style="margin-top: 30px; border: 1px solid var(--primary-color); padding: 10px 30px; border-radius: 4px; display: inline-block; cursor: pointer;">
            START ENGINE
        </div>
    `;

    const card = SciFiLayout.wrap(homeContent);
    app.appendChild(card);
    
    console.log('Renderização Visual de Teste Concluída');
});