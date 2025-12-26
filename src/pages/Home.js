import { Component } from '../core/Component.js';
import { Store } from '../core/Store.js';
import { CircularWidget } from '../components/CircularWidget.js';
export class Home extends Component {
    static get metadata() {
        return { path: '/', label: 'Comando', icon: 'fa-gamepad' };
    }

    render() {
        const state = Store.getState();
        return `
            <div class="dashboard-panel">
                <h1>Painel de Comando</h1>
                
                <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
                    <div id="widget-cpu"></div>
                    <div id="widget-shield"></div>
                </div>

                <div class="control-group">
                    <p>STATUS: <strong>${state.systemStatus}</strong></p>
                    <input type="text" id="input-name" value="${state.user}" class="scifi-input">
                    <button id="btn-update" class="scifi-btn">ATUALIZAR</button>
                </div>
            </div>
        `;
    }

    afterMount() {
        const state = Store.getState();
        const cpuWidget = new CircularWidget(
            this.element.querySelector('#widget-cpu'), 
            'REACTOR', 
            'var(--primary-color)'
        );

        const shieldWidget = new CircularWidget(
            this.element.querySelector('#widget-shield'), 
            'SHIELDS', 
            '#00ff00' 
        );

        this.interval = setInterval(() => {
            const cpuVal = Math.floor(Math.random() * 100);
            const shieldVal = Math.floor(Math.random() * 20) + 80;
            const valor = state.user? state.user : 0;

            cpuWidget.setValue(cpuVal);
            shieldWidget.setValue(valor);

        }, 2000);

        const btnUpdate = this.element.querySelector('#btn-update');
        const input = this.element.querySelector('#input-name');
        btnUpdate.addEventListener('click', () => {
            if(input.value) Store.commit('user', input.value);
        });
    }

    beforeUnmount() {
        if (this.interval) clearInterval(this.interval);
    }
}