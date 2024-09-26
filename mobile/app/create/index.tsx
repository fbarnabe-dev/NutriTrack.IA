import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { z } from 'zod' // Zod usado para validação de dados
import { zodResolver } from '@hookform/resolvers/zod' 
import { useForm } from 'react-hook-form' // Hook para lidar com formulários
import { colors } from '../../constants/colors' // Paleta de cores usada no app
import { Header } from '@/components/header' // Componente de cabeçalho personalizado
import { Select } from '../../components/input/select' // Componente de seleção
import { useDataStore } from '../../store/data' // Gerenciamento de estado com Data Store
import { router } from 'expo-router' // Navegação com Expo Router
import { Feather, Ionicons } from '@expo/vector-icons';

// Define o esquema de validação com Zod
const schema = z.object({
    sexo: z.string().min(1, { message: "O sexo é obrigatório" }),
    objetivo: z.string().min(1, { message: "O objetivo é obrigatório" }),
    nivel: z.string().min(1, { message: "Selecione o seu nivel" }),
})

// Inferindo o tipo do formulário a partir do schema
type FormData = z.infer<typeof schema>

export default function Create() {
    // Hook para controle do formulário e validação
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema) // Zod usado para validação junto com o React Hook Form
    })

    const setPageTwo = useDataStore(state => state.setPageTwo) // Função para armazenar os dados da segunda página

    // Opções de seleção para sexo, nível de atividade física e objetivo
    const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" }
    ]

    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário (pouco ou nenhuma atividade física)' },
        { label: 'Levemente ativo (exercícios de 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios de 1 a 3 vezes na semana)' },
        { label: 'Moderamente ativo (exercícios de 3 a 5 vezes na semana)', value: 'Moderamente ativo (exercícios de 3 a 5 vezes na semana)' },
        { label: 'Altamento ativo (exercícios de 5 a 7 vezes por semana)', value: 'Altamento ativo (exercícios de 5 a 7 vezes por semana)' },
    ]

    const objectiveOptions = [
        { label: 'Emagrecer', value: 'Emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' }
    ]

    // Função chamada ao enviar o formulário
    function handleCreate(data: FormData) {
        // Armazena os dados da página 2 no estado global
        setPageTwo({
            nivel: data.nivel,
            sexo: data.sexo,
            objetivo: data.objetivo
        });

        // Navega para a próxima tela "/nutrition"
        router.push("/nutrition")
    }

    return (
        <View style={styles.container}>
            <Header
                step='Passo 2'
                title='Finalizando dieta'
            />
            <ScrollView style={styles.content}>
                {/* Campos de seleção para sexo, nível e objetivo */}
                <Text style={styles.label}>Sexo:</Text>
                <Select
                    control={control}
                    name="sexo"
                    placeholder="Selecione o seu sexo..."
                    error={errors.sexo?.message}
                    options={genderOptions}
                />

                <Text style={styles.label}>Selecione o nível de atividade física:</Text>
                <Select
                    control={control}
                    name="nivel"
                    placeholder="Selecione o seu nivel de atividade física"
                    error={errors.nivel?.message}
                    options={levelOptions}
                />

                <Text style={styles.label}>Selecione o seu objetivo:</Text>
                <Select
                    control={control}
                    name="objetivo"
                    placeholder="Selecione o seu objetivo"
                    error={errors.objetivo?.message}
                    options={objectiveOptions}
                />

                {/* Botão para avançar */}
                <Pressable
                    style={styles.button}
                    onPress={handleSubmit(handleCreate)}
                >
                    <View style={styles.buttonAdvance}>
                    <Text style={styles.buttonText}>Avançar</Text>
                    <Ionicons name="arrow-forward-circle" size={16} color={colors.white}/>
                    </View>
                </Pressable>
            </ScrollView>
        </View>
    );
}

// Estilização da tela e dos elementos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    button: {
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },  
    buttonAdvance:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, 
    }
})