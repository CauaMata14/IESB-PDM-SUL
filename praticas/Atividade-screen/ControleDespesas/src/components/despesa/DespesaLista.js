import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DespesaItem from './DespesaItem';
import { useThemeColors } from '../../hooks/useThemeColors';

export default function DespesaLista({ expenses, header, emptyText }) {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();

  // Tablet ou celular deitado: lista em 2 colunas
  const numColumns = width > 600 ? 2 : 1;

  function renderDespesaItem({ item }) {
    return (
      <View style={numColumns > 1 && styles.coluna}>
        <DespesaItem {...item} />
      </View>
    );
  }

  return (
    <FlatList
      // a FlatList não aceita trocar numColumns sem remontar
      key={`colunas-${numColumns}`}
      data={expenses}
      renderItem={renderDespesaItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Ionicons name="receipt-outline" size={56} color={colors.textMuted} />
          <Text style={[styles.textoVazio, { color: colors.textMuted }]}>
            {emptyText}
          </Text>
        </View>
      }
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  conteudo: {
    paddingBottom: 24,
  },
  // Em 2 colunas, cada card ocupa metade da largura
  coluna: {
    flex: 1,
  },
  vazio: {
    alignItems: 'center',
    marginTop: 48,
    paddingHorizontal: 24,
  },
  textoVazio: {
    marginTop: 12,
    fontSize: 15,
    textAlign: 'center',
  },
});
