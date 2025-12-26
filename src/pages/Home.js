import { Component } from '../core/Component.js';
import { Store } from '../core/Store.js';

export class Home extends Component {
    static get metadata() {
        return { path: '/', label: 'Comando', icon: 'fa-gamepad' };
    }

    render() {
        const state = Store.getState();
        
        return `
            <div class="dashboard-panel">
                <h1>Painel de Comando</h1>
                <div class="hud-stat-row">
                    <p>STATUS DO SISTEMA: <strong style="color: var(--primary-color)">${state.systemStatus}</strong></p>
                </div>
                
                <br>
                
                <div class="control-group">
                    <label>Alterar Identificação:</label>
                    <input type="text" id="input-name" value="${state.user}" class="scifi-input">
                    <button id="btn-update" class="scifi-btn">ATUALIZAR DADOS</button>
                </div>

                <div class="control-group" style="margin-top: 20px;">
                    <button id="btn-alert" class="scifi-btn btn-danger">SIMULAR ALERTA</button>
                </div>
            </div>
        `;
    }

    afterMount() {
        const input = this.element.querySelector('#input-name');
        const btnUpdate = this.element.querySelector('#btn-update');
        const btnAlert = this.element.querySelector('#btn-alert');

        btnUpdate.addEventListener('click', () => {
            const newName = input.value;
            if(newName) {
                Store.commit('user', newName);
            }
        });

        btnAlert.addEventListener('click', () => {
            Store.commit('systemStatus', 'CRÍTICO');
        });
    }
}