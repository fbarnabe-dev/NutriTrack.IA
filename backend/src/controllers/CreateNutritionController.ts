import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateNutritionService } from '../services/CreateNutritionService'

// Interface para definir o formato dos dados que a função espera receber.
export interface DataProps {
    nome: string;
    peso: string;
    altura: string;
    idade: string;
    sexo: string;
    objetivo: string;
    nivel: string;
}

class CreateNutritionController {
    // Método que lida com a requisição da rota
    async handle(request: FastifyRequest, reply: FastifyReply) {
        console.log("A ROTA FOI CHAMADA!!!!")  // Log para indicar que a rota foi acionada.

        // Extraindo dados do corpo da requisição e garantindo que eles sigam a interface DataProps
        const { nome, peso, altura, idade, sexo, objetivo, nivel } = request.body as DataProps;

        // Instancia o serviço responsável pela lógica de criação da nutrição
        const createNutrition = new CreateNutritionService();

        // Executa o serviço com os dados recebidos e aguarda o resultado
        const nutrition = await createNutrition.execute({
            nome,
            peso,
            altura,
            idade,
            sexo,
            objetivo,
            nivel,
        });

        // Retorna o resultado como resposta para o cliente
        reply.send(nutrition)
    }
}

export { CreateNutritionController }
