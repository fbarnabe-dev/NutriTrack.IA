import Fastify from "fastify"
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { routes } from './routes'

// Cria uma instância do Fastify com logging habilitado
const app = Fastify({logger: true})
dotenv.config(); // Carrega variáveis de ambiente usando dotenv

// Define um manipulador de erros que retorna um código 400 e a mensagem do erro
app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
});

// Função assíncrona para inicializar o servidor
const start = async () => {
    app.register(cors); // Habilita CORS
    app.register(routes) // Registra as rotas definidas externamente

    try {
        // Inicia o servidor na porta 3333 e em "0.0.0.0" para aceitar requisições externas
        await app.listen({ port: 3333, host: "0.0.0.0" })
        console.log(`Servidor rodando no http://localhost:3333`)
    } catch (err) {
        console.log(err); // Mostra erros de inicialização do servidor
    }
};

// Executa a função de inicialização
start();
