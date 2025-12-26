export class Component {
    constructor() {
        this.element = null;
    }

    /**
     * Metadados obrigatórios
     * As classes filhas DEVEM sobrescrever isso.
     */
    static get metadata() {
        return {
            path: '/',
            label: 'Sem Nome',
            icon: 'fa-question'
        };
    }

    /**
     * Retorna o HTML string ou HTMLElement do componente
     */
    render() {
        return '<div>Componente Vazio</div>';
    }

    /**
     * Hook executado após o componente entrar na tela (DOM)
     * Para adicionar event listeners específicos da página
     */
    afterMount() {
        // Para as filhas implementarem
    }

    /**
     * Hook executado antes do componente sair da tela
     * Para limpar listeners e evitar memory leaks
     */
    beforeUnmount() {
        // Opcional
    }
}