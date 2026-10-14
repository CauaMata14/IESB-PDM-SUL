import { useLayoutEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import IconButton from '../components/IconButton';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import { CATEGORIAS } from '../constants/categorias';
import { useDespesas } from '../store/despesas-context';
import { getDataFormatada } from '../util/data';

export default function GerenciarDespesa({ route, navigation }) {
  const { despesas, adicionarDespesa, atualizarDespesa, removerDespesa } = useDespesas();

  const despesaId = route.params?.despesaId;
  const editando = !!despesaId;
  const despesaAtual = despesas.find((despesa) => despesa.id === despesaId);

  const [descricao, setDescricao] = useState(despesaAtual?.descricao ?? '');
  const [valor, setValor] = useState(despesaAtual ? despesaAtual.valor.toFixed(2) : '');
  const [data, setData] = useState(despesaAtual?.data ?? new Date());
  const [categoria, setCategoria] = useState(despesaAtual?.categoria ?? '');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editando ? 'Editar Despesa' : 'Adicionar Despesa',
    });
  }, [navigation, editando]);

  // Aceita apenas números com no máximo duas casas decimais
  function alterarValor(texto) {
    const textoComPonto = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(textoComPonto)) {
      setValor(textoComPonto);
    }
  }

  function alterarData(evento, dataSelecionada) {
    setMostrarCalendario(false);
    if (evento.type === 'set' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function confirmar() {
    const valorNumerico = parseFloat(valor);

    if (descricao.trim().length === 0) {
      Alert.alert('Campo obrigatório', 'Informe a descrição da despesa.');
      return;
    }
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Campo obrigatório', 'Informe um valor maior que zero.');
      return;
    }
    if (categoria === '') {
      Alert.alert('Campo obrigatório', 'Selecione uma categoria.');
      return;
    }

    const despesa = { descricao: descricao.trim(), valor: valorNumerico, data, categoria };
    if (editando) {
      atualizarDespesa(despesaId, despesa);
    } else {
      adicionarDespesa(despesa);
    }
    navigation.goBack();
  }

  function excluir() {
    removerDespesa(despesaId);
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Almoço"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={alterarValor}
      />

      <Text style={styles.label}>Data</Text>
      <Pressable
        onPress={() => setMostrarCalendario(true)}
        style={({ pressed }) => [styles.input, pressed && styles.pressionado]}
      >
        <Text style={styles.textoData}>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarCalendario && (
        <DateTimePicker
          value={data}
          mode="date"
          maximumDate={new Date()}
          onChange={alterarData}
        />
      )}

      <Text style={styles.label}>Categoria</Text>
      <CategoriaSeletor
        opcoes={CATEGORIAS}
        selecionada={categoria}
        onSelecionar={setCategoria}
      />

      <View style={styles.botoes}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.botao, styles.botaoCancelar, pressed && styles.pressionado]}
        >
          <Text style={styles.textoCancelar}>Cancelar</Text>
        </Pressable>
        <Pressable
          onPress={confirmar}
          style={({ pressed }) => [styles.botao, styles.botaoConfirmar, pressed && styles.pressionado]}
        >
          <Text style={styles.textoConfirmar}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>

      {editando && (
        <View style={styles.excluir}>
          <IconButton icon="trash" size={32} color="#d32f2f" onPress={excluir} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3e04c3',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#e4d9fd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textoData: {
    fontSize: 16,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    gap: 12,
  },
  botao: {
    minWidth: 120,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoCancelar: {
    borderWidth: 1,
    borderColor: '#3e04c3',
  },
  botaoConfirmar: {
    backgroundColor: '#3e04c3',
  },
  textoCancelar: {
    color: '#3e04c3',
    fontWeight: 'bold',
  },
  textoConfirmar: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  pressionado: {
    opacity: 0.5,
  },
  excluir: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e4d9fd',
    alignItems: 'center',
  },
});
