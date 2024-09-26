import axios from "axios"; // Importa a biblioteca Axios para fazer requisições HTTP

// Cria uma instância do Axios com uma URL base configurada
export const api = axios.create({
    baseURL: "http://192.168.0.120:3333" // URL base para as requisições da API, lembre-se de usar o seu endereço IPV4
})


// PARA CONSULTAR SEU ENDEREÇO IPV4, ACESSE O CMD E DIGITE IPCONFIG, LOCALIZE SEU IPV4 E TROQUE PELO SEU NA LINHA 5 NA "baseURL"