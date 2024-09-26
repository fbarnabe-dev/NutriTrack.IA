import { View, StyleSheet, Text, TextInput, KeyboardTypeOptions } from 'react-native' // Importa os componentes necessários do React Native
import { Controller } from 'react-hook-form' // Importa o Controller para gerenciar a entrada de formulários
import { colors } from '../../constants/colors' // Importa a paleta de cores personalizadas

// Define a interface para as propriedades do componente Input
interface InputProps{
    name: string; 
    control: any; 
    placeholder?: string; 
    rules?: object; 
    error?: string; 
    keyboardType: KeyboardTypeOptions; // Tipo de teclado a ser exibido
}

// Componente funcional Input que recebe as propriedades definidas na interface
export function Input({name, control, placeholder, rules, error, keyboardType}: InputProps) {
    return (
        <View style={styles.container}> 
            <Controller // Usa o Controller para conectar o campo de entrada ao estado do formulário
                control={control} 
                name={name} 
                rules={rules} 

                render={({ field: {onChange, onBlur, value } }) => ( 
                    <TextInput
                        style={styles.input} // Estilo do campo de entrada
                        placeholder={placeholder} // Texto de espaço reservado
                        onBlur={onBlur} // Evento que ocorre quando o campo perde o foco
                        value={value} // Valor atual do campo
                        onChangeText={onChange} // Função chamada ao mudar o texto
                        keyboardType={keyboardType} // Tipo de teclado
                        placeholderTextColor={"#000"} // Ajusta a opacidade do placeholder
                    />
                )}
            /> 

            {error && <Text style={styles.errorText}>{error}</Text>} 
        </View>
    );
}

// Estilos do componente
const styles = StyleSheet.create({
    container: {
        marginBottom: 16, 
    },
    input: {
        height: 44, 
        backgroundColor: colors.white, 
        paddingHorizontal: 10, 
        borderRadius: 4, 
    },
    errorText: {
        color: 'red', 
        marginTop: 4, 
    }
})
