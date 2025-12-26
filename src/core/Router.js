import { LayoutManager } from './LayoutManager.js';

export class Router {
    constructor() {
        this.routes = [];
        this.currentRoute = null;
        this.currentRouteInstance = null;
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname, false);
        });
    }

    register(PageClass) {
        const meta = PageClass.metadata;
        if (!this.routes.find(r => r.metadata.path === meta.path)) {
            this.routes.push(PageClass);
        }
    }

    getRoutes() {
        return this.routes;
    }

    navigate(path, updateHistory = true) {
        const PageClass = this.routes.find(r => r.metadata.path === path) || this.routes[0];
        if (!PageClass) return;

        if (updateHistory) {
            window.history.pushState({}, '', path);
        }
        this.loadPage(PageClass);
    }

    navigateRelative(direction) {
        if (!this.currentRoute) return;
        const currentIndex = this.routes.findIndex(r => r === this.currentRoute);
        if (currentIndex === -1) return;
        const nextIndex = (currentIndex + direction + this.routes.length) % this.routes.length;
        this.navigate(this.routes[nextIndex].metadata.path);
    }

    reload() {
        if (this.currentRoute) this.loadPage(this.currentRoute);
    }

    getCurrentElement() {
        return document.querySelector('#router-view > .scifi-card-wrapper');
    }

    loadPage(PageClass) {
        const root = document.getElementById('router-view');
        if (!root) return;

        root.innerHTML = '';

        const pageInstance = new PageClass();
        const content = pageInstance.render();

        const wrappedContent = LayoutManager.wrapContent(content);
        wrappedContent.classList.add('anim-enter-start');

        root.appendChild(wrappedContent);
        pageInstance.element = wrappedContent;
        this.currentRouteInstance = pageInstance;

        void wrappedContent.offsetWidth;

        wrappedContent.classList.remove('anim-enter-start');
        wrappedContent.classList.add('anim-enter-active');

        if (pageInstance.afterMount) pageInstance.afterMount();
        this.currentRoute = PageClass;
        window.dispatchEvent(new CustomEvent('router:change', { 
            detail: { path: PageClass.metadata.path } 
        }));
    }
}