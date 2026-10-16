import { useMemo, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { ALL_CATEGORIES, CATEGORIES } from '../constants/categories';
import { getThemeColors } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { getDataMenosDias } from '../util/data';
import { filtrarPorCategoria } from '../util/filtro';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const scheme = useColorScheme();
  const colors = getThemeColors(scheme);
  const [categoria, setCategoria] = useState(ALL_CATEGORIES);

  // Despesas dos últimos 7 dias, calculadas a partir da lista global
  const despesasRecentes = useMemo(() => {
    const seteDiasAtras = getDataMenosDias(new Date(), 7);
    const recentes = expenses.filter((expense) => expense.date >= seteDiasAtras);
    return filtrarPorCategoria(recentes, categoria);
  }, [expenses, categoria]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filtro}>
        <CategoriaSeletor
          opcoes={[ALL_CATEGORIES, ...CATEGORIES]}
          selecionada={categoria}
          onSelecionar={setCategoria}
        />
      </View>
      <DespesaSaida
        expenses={despesasRecentes}
        periodo="Últimos 7 dias"
        emptyText={
          categoria === ALL_CATEGORIES
            ? 'Nenhuma despesa nos últimos 7 dias. Toque em + para adicionar.'
            : 'Nenhuma despesa recente nesta categoria.'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtro: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
});
