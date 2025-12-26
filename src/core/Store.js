export class StoreCore {
    constructor() {
        this.state = {
            user: 'Comandante',
            systemStatus: 'ONLINE',
            theme: 'neon-blue',
            notifications: 0
        };

        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    /**
     * Atualiza o estado e notifica os ouvintes
     * @param {string} key - A chave para atualizar (ex: 'user')
     * @param {any} value - O novo valor
     */
    commit(key, value) {
        if (this.state.hasOwnProperty(key)) {
            this.state[key] = value;
            console.log(`[Store] ${key} alterado para:`, value);
            this.notify(key, value);
        } else {
            console.warn(`[Store] Chave '${key}' não existe no estado inicial.`);
        }
    }

    /**
     * Inscreve um componente para ouvir mudanças
     * @param {Function} callback - Função a ser executada quando o estado mudar
     * @returns {Function} - Função para cancelar a inscrição (unsubscribe)
     */
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    notify(key, value) {
        this.listeners.forEach(listener => listener(this.state, key, value));
    }
}

export const Store = new StoreCore();