import { Stack } from "expo-router" // Importa o Stack Navigator do Expo Router
import { QueryClientProvider, QueryClient } from '@tanstack/react-query' // Provedor de gerenciamento de consultas com React Query

// Componente RootLayout principal que envolve as rotas e configura o QueryClient
export default function RootLayout() {
  const queryClient = new QueryClient(); // Cria uma instância do QueryClient para gerenciar cache de consultas

  return (
    // Envolve o app com o QueryClientProvider, permitindo o uso de React Query nas telas
    <QueryClientProvider client={queryClient}>
      <Stack>
        
        <Stack.Screen 
          name="index" 
          options={{
            headerShown: false, // Remove o cabeçalho padrão
          }}
        />
        
        <Stack.Screen 
          name="step/index" 
          options={{
            headerShown: false, 
          }}
        />
        
        <Stack.Screen 
          name="create/index" 
          options={{
            headerShown: false, 
          }}
        />
        
        <Stack.Screen 
          name="nutrition/index" 
          options={{
            headerShown: false, 
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
