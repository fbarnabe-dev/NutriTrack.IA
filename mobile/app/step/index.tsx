import { View, Text, Image, StyleSheet, Pressable, ScrollView} from 'react-native'
import { colors } from '../../constants/colors'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { router } from 'expo-router'
import { useDataStore } from '../../store/data'
import { Ionicons, Feather } from '@expo/vector-icons'

const schema = z.object({
    nome: z.string().min(1, { message: "O nome é obrigatório"}),
    peso: z.string().min(1, { message: "O peso é obrigatório"}),
    idade: z.string().min(1, { message: "A idade é obrigatória"}),
    altura: z.string().min(1, { message: "A altura é obrigatória"}),
})

type FormData = z.infer<typeof schema>

export default function Step(){

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageOne = useDataStore(state => state.setPageOne)


    function handleCreate(data: FormData){
        console.log("PASSANDO DADOS DA PAGINA 1");
        
        setPageOne({
            nome: data.nome,
            peso: data.peso,
            idade: data.idade,
            altura: data.altura
        })

        router.push("/create")
    }

    return(
        <View style={styles.container}>
            <Header
            step = 'Passo 1'
            title = 'Vamos começar'
        />

        <ScrollView style={styles.content}>
            <Text style={styles.label}>Nome:</Text>
            <Input
                name="nome"
                control={control}
                placeholder="Digite seu nome..."
                error={errors.nome?.message}
                keyboardType="default"
                
            />

            <Text style={styles.label}>Seu peso atual:</Text>
            <Input
                name="peso"
                control={control}
                placeholder="Ex: 75"
                error={errors.peso?.message}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Sua Idade atual:</Text>
            <Input
                name="idade"
                control={control}
                placeholder="Ex: 25"
                error={errors.idade?.message}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Sua altura atual:</Text>
            <Input
                name="altura"
                control={control}
                placeholder="Ex: 1.70"
                error={errors.altura?.message}
                keyboardType="numeric"
            />

            <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                <View style={styles.iconNext}> 
                <Text style={styles.buttonText}>Avançar</Text>
                <Ionicons name="arrow-forward-circle" size={16} color={colors.white}/>
                </View>
            </Pressable>

        </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background
    },
    content:{
        paddingLeft: 16,
        paddingRight: 16,
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    button:{
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconNext:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input:{

    }
})