import { App } from './App.js';

class LayoutManagerCore {
    constructor() {
        this.activeLayoutStrategy = null; 
    }
    /**
     * Define qual componente será usado para envelopar as páginas
     * @param {Class} LayoutClass - A classe do layout (ex: SciFiLayout, CleanLayout)
     */
    setLayout(LayoutClass) {
        this.activeLayoutStrategy = LayoutClass;
        if (App.router && App.router.currentRoute) {
            console.log('[LayoutManager] Trocando motor visual...');
            App.router.reload();
        }
    }

    wrapContent(contentElement) {
        if (!this.activeLayoutStrategy) {
            const wrapper = document.createElement('div');
            if (typeof contentElement === 'string') wrapper.innerHTML = contentElement;
            else wrapper.appendChild(contentElement);
            return wrapper;
        }

        return this.activeLayoutStrategy.wrap(contentElement);
    }
}

export const LayoutManager = new LayoutManagerCore();