export class CircularWidget {
    /**
     * @param {HTMLElement} container - Onde o widget será desenhado
     * @param {string} label - Texto abaixo do número (ex: "CPU LOAD")
     * @param {string} color - Cor do widget (ex: var(--primary-color))
     */
    constructor(container, label = 'SYSTEM', color = 'var(--primary-color)') {
        this.container = container;
        this.label = label;
        this.color = color;
        this.percent = 0;
        this.render();
    }

    render() {
        // SVG com ViewBox 0 0 100 100 para facilitar escala
        // r=40 significa circunferencia = 2 * PI * 40 ≈ 251.2
        this.circumference = 2 * Math.PI * 40;

        this.container.innerHTML = `
            <div class="hud-widget">
                <div class="hud-spinner"></div> <svg class="progress-ring" width="120" height="120" viewBox="0 0 100 100">
                    <circle 
                        stroke="rgba(255,255,255,0.1)" 
                        stroke-width="8" 
                        fill="transparent" 
                        r="40" 
                        cx="50" 
                        cy="50" 
                    />
                    
                    <circle 
                        class="progress-ring__circle"
                        stroke="${this.color}" 
                        stroke-width="8" 
                        fill="transparent" 
                        r="40" 
                        cx="50" 
                        cy="50" 
                        style="stroke-dasharray: ${this.circumference} ${this.circumference}; stroke-dashoffset: ${this.circumference};"
                    />
                </svg>
                
                <div class="hud-text">
                    <span class="hud-value">0%</span>
                    <span class="hud-label">${this.label}</span>
                </div>
            </div>
        `;

        this.circleElement = this.container.querySelector('.progress-ring__circle');
        this.textElement = this.container.querySelector('.hud-value');
    }

    /**
     * Atualiza o valor do widget
     * @param {number} percent - 0 a 100
     */
    setValue(percent) {
        this.percent = percent;
        
        const offset = this.circumference - (percent / 100) * this.circumference;
        this.circleElement.style.strokeDashoffset = offset;
        this.textElement.innerText = `${Math.floor(percent)}%`;
        
        if (percent > 90) {
            this.circleElement.style.stroke = '#ff3333';
            this.textElement.style.color = '#ff3333';
        } else {
            this.circleElement.style.stroke = this.color;
            this.textElement.style.color = '#fff';
        }
    }
}