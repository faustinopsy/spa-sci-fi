export class SciFiLayout {
    static wrap(contentElement) {
        const wrapper = document.createElement('div');
        wrapper.className = 'scifi-card-wrapper';

        const borderLayer = document.createElement('div');
        borderLayer.className = 'scifi-card-border';

        const glassLayer = document.createElement('div');
        glassLayer.className = 'scifi-card-glass';

        const contentContainer = document.createElement('div');
        contentContainer.className = 'scifi-content';
        
        if (typeof contentElement === 'string') {
            contentContainer.innerHTML = contentElement;
        } else if (contentElement instanceof HTMLElement) {
            contentContainer.appendChild(contentElement);
        }

        wrapper.appendChild(borderLayer);
        wrapper.appendChild(glassLayer);
        wrapper.appendChild(contentContainer);

        return wrapper;
    }
}