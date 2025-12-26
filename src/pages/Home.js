import { Component } from '../core/Component.js';

export class Home extends Component {
    static get metadata() {
        return { 
            path: '/', 
            label: 'Base', 
            icon: 'fa-home' 
        };
    }

    render() {
        return `
            <h1>Início</h1>
            <p>Bem-vindo ao sistema modular.</p>
            <p>Arraste para navegar.</p>
        `;
    }
}