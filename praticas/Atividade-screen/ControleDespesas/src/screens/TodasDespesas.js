import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { CATEGORIAS, TODAS_CATEGORIAS } from '../constants/categorias';
import { useDespesas } from '../store/despesas-context';
import { filtrarPorCategoria } from '../util/filtro';

export default function TodasDespesas() {
  const { despesas } = useDespesas();
  const [filtro, setFiltro] = useState(TODAS_CATEGORIAS);

  const despesasFiltradas = filtrarPorCategoria(despesas, filtro);

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
        periodo={filtro === TODAS_CATEGORIAS ? 'Total' : `Total em ${filtro}`}
        textoVazio="Nenhuma despesa cadastrada nesta categoria."
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
