import { DataProps } from '../controllers/CreateNutritionController'
import { GoogleGenerativeAI } from '@google/generative-ai'

class CreateNutritionService {
    // Função principal para executar a criação da dieta, recebendo os dados da interface DataProps
    async execute({nome, peso, altura, idade, sexo, objetivo, nivel}: DataProps) {

        try {
            // Inicializa o Google Generative AI usando a chave de API fornecida
            const genAI = new GoogleGenerativeAI(process.env.API_KEY!)
            
            // Define o modelo específico a ser utilizado, no caso, "gemini-1.5-flash"
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

            // Envia uma solicitação para gerar um conteúdo com base nas informações do usuário, pedindo a criação de uma dieta personalizada em JSON
            const response = await model.generateContent(`Crie uma dieta completa para uma pessoa com nome: ${nome} do sexo ${sexo} 
                com peso atual: ${peso}kg, altura: ${altura}, idade: ${idade} anos e com foco e objetivo em ${objetivo}, 
                atualmente nível de atividade: ${nivel} e ignore qualquer outro parametro que não seja os passados, 
                retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, 
                propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, 
                propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição 
                a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo 
                os alimentos dessa refeição e pode incluir uma propriedade como suplementos contendo array com sugestão de suplemento 
                que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, 
                retorne em json e nenhuma propriedade pode ter acento.`)

            // Exibe a resposta completa em JSON no console para depuração
            console.log(JSON.stringify(response, null, 2));

            // Verifica se a resposta do modelo contém dados e se existem candidatos (conteúdo gerado)
            if(response.response && response.response.candidates) {
                const jsonText = response.response.candidates[0]?.content.parts[0].text as string;

                // Remove formatações desnecessárias para obter o JSON puro
                let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

                // Converte a string formatada para um objeto JSON
                let jsonObject = JSON.parse(jsonString)

                // Retorna o JSON gerado
                return { data: jsonObject }
            }

        } catch (err) {
            // Exibe o erro no console e lança uma exceção se algo der errado
            console.error("Erro JSON: ", err);
            throw new Error("Failed create.")
        }
    }
}

export { CreateNutritionService }
