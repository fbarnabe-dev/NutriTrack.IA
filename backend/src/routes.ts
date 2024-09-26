import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply
} from 'fastify';
import { CreateNutritionController } from './controllers/CreateNutritionController';

// Função principal para registrar rotas no Fastify
export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    // Rota GET "/teste" para enviar um JSON de dieta simulado
    fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
        // Exemplo de JSON simulado para responder com uma dieta personalizada
        let responseText = "```json\n{\n  \"nome\": \"Felipe\", ... }\n```\n";

        try {
            // Remove o formato de código e converte o texto para JSON
            let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
            let jsonObject = JSON.parse(jsonString);

            // Envia a resposta com o JSON criado
            return reply.send({ data: jsonObject });
        } catch (err) {
            console.log(err);
        }

        // Resposta de fallback
        reply.send({ ok: true });
    });

    // Rota POST "/create" para criar uma nova dieta com base nos dados enviados
    fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
        
        // Utiliza o controlador para processar a requisição e criar a dieta
        return new CreateNutritionController().handle(request, reply);
    });

}
