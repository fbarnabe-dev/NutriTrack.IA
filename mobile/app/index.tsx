import { View, Text, Image, StyleSheet, Pressable } from 'react-native' // Importa componentes do React Native
import { colors } from '../constants/colors' // Importa as cores definidas no arquivo de constantes
import { Link } from 'expo-router' // Importa o Link para navegação
import { Feather, Ionicons } from '@expo/vector-icons'

// Função principal que renderiza a tela inicial
export default function Index() {
  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/images/logo7.png')}
      />

      <Text style={styles.title}>
        NutriTrack<Text style={{ color: colors.white }}>.IA</Text>
      </Text>

      <Text style={styles.text}>
        Sua dieta personalizada com inteligência artificial
      </Text>

      {/* Link que redireciona para a tela de "step", estilizado como botão */}
      <Link href="/step" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconNutrition}>
          <Text style={styles.buttonText}>Gerar dieta</Text>
          <Ionicons name="nutrition" size={16} color={colors.white}/>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

// Estilos da tela inicial
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background, 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 36, 
    fontWeight: 'bold', 
    color: colors.green, 
  },
  text: {
    fontSize: 16, 
    color: colors.white, 
    width: 240, 
    textAlign: 'center', 
    marginTop: 8, 
    marginBottom: 8, 
  },
  button: {
    backgroundColor: colors.blue, 
    width: '100%', 
    height: 40, 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 34, 
  },
  buttonText: {
    color: colors.white, 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
  iconNutrition:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, 
  }
})
