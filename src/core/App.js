import { Router } from './Router.js';

class AppCore {
    constructor() {
        this.router = new Router();
    }
    /**
     * Método para registrar módulos (Páginas)
     */
    use(PageClass) {
        this.router.register(PageClass);
        return this;
    }
    /**
     * Inicia a aplicação
     */
    start() {
        const initialPath = window.location.pathname;
        this.router.navigate(initialPath);
    }
}

export const App = new AppCore();