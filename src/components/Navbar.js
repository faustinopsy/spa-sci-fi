import { App } from '../core/App.js';
import { Store } from '../core/Store.js'; 

export class Navbar {
    constructor() {
        this.container = document.getElementById('navbar-container');
        this.unsubscribe = null; 
    }

    render() {
        if (!this.container) return;

        this.updateHTML();
        
        this.addNavListeners();
        this.highlightActive(window.location.pathname);

        this.unsubscribe = Store.subscribe((state, key) => {
            if (key === 'user' || key === 'notifications') {
                this.updateUserInfo(state);
            }
        });
    }

    updateHTML() {
        const routes = App.router.getRoutes();
        const state = Store.getState();

        const navHtml = `
            <nav class="scifi-nav">
                <div class="nav-brand">
                    <span id="nav-user-display">CMD. ${state.user}</span>
                    <span class="status-dot"></span>
                </div>
                <div class="nav-links">
                    ${routes.map(route => {
                        const meta = route.metadata;
                        return `
                            <a href="${meta.path}" class="nav-link" data-path="${meta.path}">
                                <i class="fas ${meta.icon}"></i>
                                <span class="link-text">${meta.label}</span>
                            </a>
                        `;
                    }).join('')}
                </div>
            </nav>
        `;
        this.container.innerHTML = navHtml;
    }

    updateUserInfo(state) {
        const userDisplay = this.container.querySelector('#nav-user-display');
        if (userDisplay) {
            userDisplay.innerText = `CMD. ${state.user}`;
            userDisplay.style.color = '#fff';
            setTimeout(() => userDisplay.style.color = '', 300);
        }
    }

    addNavListeners() {
        this.container.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                App.router.navigate(link.getAttribute('data-path'));
            });
        });
        window.addEventListener('router:change', (e) => this.highlightActive(e.detail.path));
    }
    
    highlightActive(currentPath) {
        if (currentPath === '' || currentPath === '/index.html') currentPath = '/';
        this.container.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-path') === currentPath) link.classList.add('active');
        });
    }
}