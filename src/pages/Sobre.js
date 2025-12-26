import { Component } from '../core/Component.js';

export class Sobre extends Component {
    static get metadata() {
        return { 
            path: '/sobre', 
            label: 'Dados', 
            icon: 'fa-database' 
        };
    }

    render() {
        return `
            <h1>Dados do Sistema</h1>
            <p>Status: Operacional</p>
            <p>Versão: 2.0 Alpha</p>
        `;
    }
}