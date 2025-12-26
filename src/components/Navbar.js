import { App } from '../core/App.js';

export class Navbar {
    constructor() {
        this.container = document.getElementById('navbar-container');
    }

    render() {
        if (!this.container) return;
        const routes = App.router.getRoutes();
        const navHtml = `
            <nav class="scifi-nav">
                ${routes.map(route => {
                    const meta = route.metadata;
                    return `
                        <a href="${meta.path}" class="nav-link" data-path="${meta.path}">
                            <i class="fas ${meta.icon}"></i>
                            <span>${meta.label}</span>
                        </a>
                    `;
                }).join('')}
            </nav>
        `;

        this.container.innerHTML = navHtml;
        this.addListeners();
        this.highlightActive(window.location.pathname);
    }

    addListeners() {
        this.container.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const path = link.getAttribute('data-path');
                App.router.navigate(path);
            });
        });

        window.addEventListener('router:change', (e) => {
            this.highlightActive(e.detail.path);
        });
    }

    highlightActive(currentPath) {
        if (currentPath === '' || currentPath === '/index.html') currentPath = '/'; 
        const links = this.container.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-path') === currentPath) {
                link.classList.add('active');
            }
        });
    }
}