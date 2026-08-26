import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Programação para Dispositivos Móveis</Text>
      <Text style={styles.subtitulo}>Olá, Cauã!</Text>
      <Text style={styles.apoio}>Meu segundo passo com Expo e React Native</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 6,
  },
  apoio: {
    fontSize: 14,
    color: '#555',
  },
});
