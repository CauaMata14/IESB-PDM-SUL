import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import IconButton from './src/components/IconButton';
import { Colors } from './src/constants/theme';
import { ExpensesContextProvider } from './src/store/expenses-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação em abas, aninhada dentro da Stack principal
function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarLabelStyle: { fontSize: 12 },
        // botão "+" no canto direito do cabeçalho de todas as abas
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  // Cabeçalhos e barra de abas acompanham o tema do sistema
  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {/* Estado global das despesas, compartilhado entre todas as telas */}
      <ExpensesContextProvider>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Despesas"
              component={BottomTabScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GerenciarDespesa"
              component={GerenciarDespesa}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </SafeAreaProvider>
  );
}
