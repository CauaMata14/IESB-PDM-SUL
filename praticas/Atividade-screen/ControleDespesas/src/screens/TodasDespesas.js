import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { ALL_CATEGORIES, CATEGORIES } from '../constants/categories';
import { useDebounce } from '../hooks/useDebounce';
import { getThemeColors } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { filtrarPorCategoria, filtrarPorDescricao } from '../util/filtro';

export default function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const scheme = useColorScheme();
  const colors = getThemeColors(scheme);

  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState(ALL_CATEGORIES);
  const buscaComAtraso = useDebounce(busca, 300);

  // Busca + filtro por categoria; o total do sumário usa esta mesma lista
  const despesasFiltradas = useMemo(
    () => filtrarPorDescricao(filtrarPorCategoria(expenses, categoria), buscaComAtraso),
    [expenses, categoria, buscaComAtraso]
  );

  const temFiltro = buscaComAtraso.trim() !== '' || categoria !== ALL_CATEGORIES;

  function limparTudo() {
    Alert.alert('Limpar tudo', 'Deseja apagar todas as despesas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Apagar', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filtros}>
        <View
          style={[styles.busca, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={[styles.inputBusca, { color: colors.text }]}
            placeholder="Buscar por descrição"
            placeholderTextColor={colors.textMuted}
            value={busca}
            onChangeText={setBusca}
            autoCorrect={false}
          />
        </View>
        <CategoriaSeletor
          opcoes={[ALL_CATEGORIES, ...CATEGORIES]}
          selecionada={categoria}
          onSelecionar={setCategoria}
        />
        {expenses.length > 0 && (
          <Pressable
            onPress={limparTudo}
            style={({ pressed }) => [styles.limpar, pressed && styles.pressionado]}
          >
            <Ionicons name="trash-outline" size={16} color={colors.error} />
            <Text style={[styles.textoLimpar, { color: colors.error }]}>Limpar tudo</Text>
          </Pressable>
        )}
      </View>
      <DespesaSaida
        expenses={despesasFiltradas}
        periodo="Total"
        emptyText={
          temFiltro
            ? 'Nenhuma despesa encontrada para esta busca.'
            : 'Nenhuma despesa. Toque em + para adicionar.'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtros: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputBusca: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 15,
  },
  limpar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
  },
  textoLimpar: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  pressionado: {
    opacity: 0.5,
  },
});
