import { StyleSheet, Text, View } from 'react-native';

import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

// Recebe a lista (já filtrada pela tela) e repassa para o sumário e a lista
export default function DespesaSaida({ despesas, periodo, textoVazio }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {despesas.length > 0 ? (
        <DespesaLista despesas={despesas} />
      ) : (
        <Text style={styles.textoVazio}>{textoVazio}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 15,
    color: '#666666',
  },
});
