import './style.css';
import { App } from './core/App.js';
import { Home } from './pages/Home.js';
import { Sobre } from './pages/Sobre.js';
import { Navbar } from './components/Navbar.js';
import { InputController } from './core/InputController.js';
import { SciFiLayout } from './components/SciFiLayout.js';
import { CleanLayout } from './components/CleanLayout.js';
import { LayoutManager } from './core/LayoutManager.js';

LayoutManager.setLayout(SciFiLayout);

App
.use(Home)
.use(Sobre);

document.addEventListener('DOMContentLoaded', () => {
    const navbar = new Navbar();
    navbar.render();
    
    App.start();
    new InputController();

    createThemeSwitcher();
});

function createThemeSwitcher() {
    const btn = document.createElement('button');
    btn.innerText = 'Trocar Engine Visual';
    btn.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 9999; padding: 10px; cursor: pointer;';
    
    let isSciFi = true;

    btn.onclick = () => {
        if (isSciFi) {
            LayoutManager.setLayout(CleanLayout);
            document.body.style.background = '#f0f0f0'; 
        } else {
            LayoutManager.setLayout(SciFiLayout);
            document.body.style.background = '#000';
        }
        isSciFi = !isSciFi;
    };

    document.body.appendChild(btn);
}