import { StyleSheet, View } from 'react-native';

import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

const TEXTO_VAZIO_PADRAO = 'Nenhuma despesa. Toque em + para adicionar.';

// Recebe a lista (já filtrada pela tela); o sumário vira o cabeçalho da FlatList
export default function DespesaSaida({ expenses, periodo, emptyText = TEXTO_VAZIO_PADRAO }) {
  return (
    <View style={styles.container}>
      <DespesaLista
        expenses={expenses}
        header={<DespesaSumario expenses={expenses} periodo={periodo} />}
        emptyText={emptyText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
