import { create } from 'zustand'; // Importa a função create da biblioteca Zustand para criar um store

// Define o tipo User com as propriedades relacionadas ao usuário
export type User = {
    nome: string; 
    peso: string; 
    idade: string; 
    altura: string; 
    nivel: string; 
    objetivo: string; 
    sexo: string; 
}

// Define o tipo DataState que representa o estado do store
type DataState = {
    user: User; 
    setPageOne: (data: Omit<User, "sexo" | "objetivo" | "nivel">) => void; // Função para atualizar dados do usuário da primeira página
    setPageTwo: (data: Pick<User, "sexo" | "objetivo" | "nivel">) => void; // Função para atualizar dados do usuário da segunda página
}

// Cria o store com Zustand que gerencia o estado do usuário
export const useDataStore = create<DataState>((set) => ({
    user: { 
        nome: "",
        idade: "",
        nivel: "",
        objetivo: "",
        peso: "",
        sexo: "",
        altura: ""
    },
    setPageOne: (data) => set((state) => ({ user: { ...state.user, ...data } })), 
    setPageTwo: (data) => set((state) => ({ user: { ...state.user, ...data } })), 
}))
