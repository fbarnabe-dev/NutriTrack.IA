import { View, StyleSheet, Pressable, Text, SafeAreaView, Platform, StatusBar } from "react-native" // Importa os componentes necessários do React Native
import { Feather } from '@expo/vector-icons' // Importa ícones do Feather
import { colors } from '../../constants/colors' // Importa a paleta de cores personalizadas
import { router } from 'expo-router' // Importa o roteador da Expo para navegação

// Define a interface para as propriedades do componente Header
interface HeaderProps{
    step: string; 
    title: string; 
}

// Componente funcional Header que recebe as propriedades 'step' e 'title'
export function Header({step, title}: HeaderProps){
    return(
        <SafeAreaView style={styles.container}> 
            <View style={styles.content}> 
                <View style={styles.row}> 
                    <Pressable onPress={ () => router.back() }> 
                        <Feather name="arrow-left" size={24} color="#000"/> 
                    </Pressable>

                    <Text style={styles.text}> 
                        {step} <Feather name="loader" size={16} color="#000"/> 
                    </Text>
                </View>

                <Text style={styles.title}> 
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    )
}

// Estilos do componente
const styles = StyleSheet.create({
    container: { 
        backgroundColor: colors.white, 
        borderBottomStartRadius: 14, 
        borderBottomLeftRadius: 14, 
        marginBottom: 14, 
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 34 : 34 // Espaço superior baseado no StatusBar
    },
    content: { 
        paddingLeft: 16, 
        paddingRight: 16, 
        paddingBottom: 34, 
        borderBottomStartRadius: 14, 
        borderBottomLeftRadius: 14, 
    },
    row: { 
        flexDirection: 'row', 
        gap: 8, 
        alignItems: 'center' 
    },
    text: { 
        fontSize: 18, 
    },
    title: { 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: colors.background 
    }
});
