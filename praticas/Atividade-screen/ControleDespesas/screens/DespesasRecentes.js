import { StyleSheet, Text, View } from 'react-native';

export default function DespesasRecentes() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tela: Despesas Recentes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
