import { View, Text, StyleSheet, Pressable, ScrollView, Share } from 'react-native'; // Importação de componentes do React Native
import { useDataStore } from '../../store/data'; // Importa estado global do usuário
import { api } from '../../services/api'; // Serviço de API para chamadas HTTP
import { useQuery } from '@tanstack/react-query'; // Ferramenta para gerenciamento de estados de requisições assíncronas
import { colors } from "../../constants/colors"; // Paleta de cores centralizada
import { Data } from '../../types/data'; // Tipos de dados
import { Link, router } from 'expo-router'; // Gerenciamento de rotas no Expo
import { Ionicons, Feather } from '@expo/vector-icons'; // Ícones

// Definição da interface para o tipo de dado da resposta
interface ResponseData {
    data: Data
}

// Componente principal da página de Nutrição
export default function Nutrition() {
    // Busca dados do usuário do estado global
    const user = useDataStore(state => state.user)

    // Busca dados de nutrição com base no usuário utilizando o React Query
    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"], // Identificador da query
        queryFn: async () => {
            try {
                // Verifica se o usuário está presente
                if (!user) {
                    throw new Error("Faltam dados do usuário")
                }

                // Envia dados do usuário para o endpoint de criação da dieta
                const response = await api.post<ResponseData>("/create", {
                    nome: user.nome,
                    peso: user.peso,
                    altura: user.altura,
                    idade: user.idade,
                    sexo: user.sexo,
                    objetivo: user.objetivo,
                    nivel: user.nivel
                })

                return response.data?.data || {}; // Retorna um objeto vazio se não houver dados
            } catch (err) {
                console.log("Falha ao buscar dados nutricionais", err); // Loga erros no console
                throw new Error("Erro ao buscar dados nutricionais");
            }
        }
    });

    // Caso os dados ainda estejam carregando
    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando a sua dieta!</Text>
                <Text style={styles.loadingText}>Consultando IA...</Text>
            </View>
        );
    }

    // Caso ocorra erro durante a geração da dieta
    if (error) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
                <Link href="/">
                    <Text style={styles.loadingText}>Tente novamente</Text>
                </Link>
            </View>
        )
    }

    // Função para compartilhar a dieta gerada
    async function handleShare() {
        try {
            if (data && Object.keys(data).length === 0) return;

            // Formatação das refeições e suplementos para o compartilhamento
            const supplements = `${data?.suplementos.map(item => `• ${item}`).join('\n')}`
            const foods = `${data?.refeicoes.map(item => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: \n${item.alimentos.map(alimento => `• ${alimento}`).join('\n')}`).join('\n')}`

            // Mensagem final a ser compartilhada
            const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica de Suplementos: \n${supplements}`

            await Share.share({
                message: message, // Compartilha a dieta formatada
            })
        } catch (err) {
            console.log(err); // Loga erros no compartilhamento
        }
    }

    return (
        <View style={styles.container}>
            {/* Cabeçalho da página */}
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha dieta</Text>

                    {/* Botão para compartilhar a dieta */}
                    <Pressable style={styles.buttonshare} onPress={handleShare}>
                        <View style={styles.buttonShareContent}>
                        <Text style={styles.buttonShareText}>Compartilhar</Text>
                        <Ionicons name="share-social-outline" size={16} color={colors.white}/>
                        </View>
                    </Pressable>
                </View>
            </View>

            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                {/* Exibe a dieta caso os dados estejam disponíveis */}
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.nome}>Nome: {data.nome}</Text>
                        <Text style={styles.objetivo}>Foco: {data.objetivo}</Text>

                        <Text style={styles.label}>Refeições:</Text>
                        <ScrollView>
                            <View style={styles.foods}>
                                {/* Lista de refeições */}
                                {data?.refeicoes && data.refeicoes.map((refeicao) => (
                                    <View key={refeicao.nome} style={styles.food}>
                                        <View style={styles.foodHeader}>
                                            <Text style={styles.foodName}>{refeicao.nome}</Text>
                                            <Ionicons name="restaurant" size={16} color="#000" />
                                        </View>

                                        <View style={styles.foodContent}>
                                            <Feather name="clock" size={14} color="#000" />
                                            <Text>Horário: {refeicao.horario}</Text>
                                        </View>

                                        <Text style={styles.foodText}>Alimentos:</Text>
                                        {refeicao.alimentos.map(alimento => (
                                            <Text key={alimento}>{alimento}</Text>
                                        ))}
                                    </View>
                                ))}
                            </View>

                            {/* Suplementos recomendados */}
                            <View style={styles.supplements}>
                                <Text style={styles.foodName}>Dica de suplementos:</Text>
                                {data?.suplementos && data.suplementos.map(item => (
                                    <Text key={item}>{item}</Text>
                                ))}
                            </View>

                            {/* Botão para gerar nova dieta */}
                            <Pressable style={styles.buttonNewDiet} onPress={() => router.replace("/")}>
                            <View style={styles.buttonGenerateAgain}>
                                <Text style={styles.buttonText}>Gerar nova dieta</Text>
                                <Feather name="refresh-cw" size={16} color={colors.white}/>
                                </View>
                            </Pressable>
                        </ScrollView>
                    </>
                )}
            </View>
        </View>
    );
}

// Estilos da página
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: colors.white,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    containerHeader: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 16,
    },
    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    title: {
        fontSize: 28,
        color: colors.background,
        fontWeight: 'bold'
    },
    buttonshare: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4,
    },
    buttonShareText: {
        color: colors.white,
        fontWeight: 'bold',
        
        
    },
    nome: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold'
    },
    objetivo: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 24
    },
    label: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    foods: {
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 8,
        gap: 8,
    },
    food: {
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        padding: 8,
        borderRadius: 4,
    },
    foodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    foodName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    foodContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    foodText: {
        fontSize: 16,
        marginBottom: 4,
        marginTop: 14,
    },
    supplements: {
        backgroundColor: colors.white,
        marginTop: 14,
        marginBottom: 14,
        padding: 14,
        borderRadius: 8,
    },
    buttonNewDiet: {
        backgroundColor: colors.blue,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 24,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonShareContent:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    buttonGenerateAgain:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        
    }
})

