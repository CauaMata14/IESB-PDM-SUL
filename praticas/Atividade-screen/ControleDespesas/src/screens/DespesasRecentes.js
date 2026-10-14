import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { CATEGORIAS, TODAS_CATEGORIAS } from '../constants/categorias';
import { useDespesas } from '../store/despesas-context';
import { getDataMenosDias } from '../util/data';
import { filtrarPorCategoria } from '../util/filtro';

export default function DespesasRecentes() {
  const { despesas } = useDespesas();
  const [filtro, setFiltro] = useState(TODAS_CATEGORIAS);

  // Despesas dos últimos 7 dias
  const seteDiasAtras = getDataMenosDias(new Date(), 7);
  const despesasRecentes = despesas.filter((despesa) => despesa.data >= seteDiasAtras);

  const despesasFiltradas = filtrarPorCategoria(despesasRecentes, filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filtro}>
        <CategoriaSeletor
          opcoes={[TODAS_CATEGORIAS, ...CATEGORIAS]}
          selecionada={filtro}
          onSelecionar={setFiltro}
        />
      </View>
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo="Últimos 7 dias"
        textoVazio="Nenhuma despesa nos últimos 7 dias nesta categoria."
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
  },
});
