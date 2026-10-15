import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconButton from '../components/IconButton';
import { CATEGORIES } from '../constants/categories';
import { useThemeColors } from '../hooks/useThemeColors';
import { useExpenses } from '../store/expenses-context';
import { getDataFormatada, isDataFutura } from '../util/data';

// Regras do formulário: devolve um objeto com a mensagem de cada campo inválido
function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }
  if (isDataFutura(values.date)) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expense = expenses.find((item) => item.id === expenseId);

  // Estado único do formulário (no modo edição, já começa preenchido)
  const [form, setForm] = useState({
    description: expense?.description ?? '',
    amount: expense ? String(expense.amount) : '',
    date: expense?.date ?? new Date(),
    category: expense?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [tentouSalvar, setTentouSalvar] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [modalCategoria, setModalCategoria] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    const novoForm = { ...form, [field]: value };
    setForm(novoForm);
    // Depois da primeira tentativa de salvar, revalida a cada mudança
    // para a mensagem sumir assim que o campo for corrigido
    if (tentouSalvar) {
      setErrors(validate(novoForm));
    }
  }

  // Máscara: apenas números com no máximo duas casas decimais
  function handleAmountChange(texto) {
    const textoComPonto = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(textoComPonto)) {
      handleChange('amount', textoComPonto);
    }
  }

  function handleDateChange(event, dataSelecionada) {
    setMostrarCalendario(false);
    if (event.type === 'set' && dataSelecionada) {
      handleChange('date', dataSelecionada);
    }
  }

  function selecionarCategoria(categoria) {
    handleChange('category', categoria);
    setModalCategoria(false);
  }

  function salvar() {
    setTentouSalvar(true);
    const novosErros = validate(form);
    setErrors(novosErros);
    if (Object.keys(novosErros).length > 0) {
      return;
    }

    const expenseData = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };
    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  function confirmarExclusao() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  // Estilo de um campo: borda vermelha quando há erro
  function estiloCampo(field) {
    return [
      styles.input,
      {
        backgroundColor: colors.card,
        borderColor: errors[field] ? colors.error : colors.border,
        color: colors.text,
      },
    ];
  }

  function mensagemErro(field) {
    if (!errors[field]) {
      return null;
    }
    return <Text style={[styles.erro, { color: colors.error }]}>{errors[field]}</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.tela, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.label, { color: colors.primary }]}>Descrição</Text>
        <TextInput
          style={estiloCampo('description')}
          placeholder="Ex: Almoço"
          placeholderTextColor={colors.textMuted}
          value={form.description}
          onChangeText={(texto) => handleChange('description', texto)}
        />
        {mensagemErro('description')}

        <Text style={[styles.label, { color: colors.primary }]}>Valor (R$)</Text>
        <TextInput
          style={estiloCampo('amount')}
          placeholder="0.00"
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          value={form.amount}
          onChangeText={handleAmountChange}
        />
        {mensagemErro('amount')}

        <Text style={[styles.label, { color: colors.primary }]}>Data</Text>
        <Pressable
          onPress={() => setMostrarCalendario(true)}
          style={({ pressed }) => [estiloCampo('date'), styles.campoSelecao, pressed && styles.pressionado]}
        >
          <Text style={[styles.textoCampo, { color: colors.text }]}>
            {getDataFormatada(form.date)}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={colors.textMuted} />
        </Pressable>
        {mensagemErro('date')}
        {mostrarCalendario && (
          <DateTimePicker value={form.date} mode="date" onChange={handleDateChange} />
        )}

        <Text style={[styles.label, { color: colors.primary }]}>Categoria</Text>
        <Pressable
          onPress={() => setModalCategoria(true)}
          style={({ pressed }) => [estiloCampo('category'), styles.campoSelecao, pressed && styles.pressionado]}
        >
          <Text
            style={[styles.textoCampo, { color: form.category ? colors.text : colors.textMuted }]}
          >
            {form.category || 'Selecione uma categoria'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
        </Pressable>
        {mensagemErro('category')}

        <View style={styles.botoes}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.botao,
              { borderWidth: 1, borderColor: colors.primary },
              pressed && styles.pressionado,
            ]}
          >
            <Text style={[styles.textoBotao, { color: colors.primary }]}>Cancelar</Text>
          </Pressable>
          <Pressable
            onPress={salvar}
            style={({ pressed }) => [
              styles.botao,
              { backgroundColor: colors.primary },
              pressed && styles.pressionado,
            ]}
          >
            <Text style={[styles.textoBotao, { color: colors.onPrimary }]}>Salvar</Text>
          </Pressable>
        </View>

        {isEditing && (
          <View style={[styles.excluir, { borderTopColor: colors.border }]}>
            <IconButton icon="trash" size={32} color={colors.error} onPress={confirmarExclusao} />
          </View>
        )}
      </ScrollView>

      {/* Escolha da categoria: só as opções de CATEGORIES, sem digitação livre */}
      <Modal
        visible={modalCategoria}
        transparent
        animationType="slide"
        onRequestClose={() => setModalCategoria(false)}
      >
        <View style={[styles.fundoModal, { backgroundColor: colors.overlay }]}>
          <Pressable style={styles.areaFechar} onPress={() => setModalCategoria(false)} />
          <View
            style={[
              styles.painelModal,
              { backgroundColor: colors.card, paddingBottom: insets.bottom + 16 },
            ]}
          >
            <Text style={[styles.tituloModal, { color: colors.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((categoria) => {
              const selecionada = categoria === form.category;
              return (
                <Pressable
                  key={categoria}
                  onPress={() => selecionarCategoria(categoria)}
                  style={({ pressed }) => [
                    styles.opcaoModal,
                    { borderBottomColor: colors.border },
                    pressed && styles.pressionado,
                  ]}
                >
                  <Text
                    style={[
                      styles.textoOpcao,
                      { color: selecionada ? colors.primary : colors.text },
                      selecionada && styles.textoOpcaoSelecionada,
                    ]}
                  >
                    {categoria}
                  </Text>
                  {selecionada && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </Pressable>
              );
            })}
            <Pressable
              onPress={() => setModalCategoria(false)}
              style={({ pressed }) => [styles.cancelarModal, pressed && styles.pressionado]}
            >
              <Text style={[styles.textoBotao, { color: colors.primary }]}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  campoSelecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textoCampo: {
    fontSize: 16,
  },
  erro: {
    fontSize: 13,
    marginTop: 4,
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
  textoBotao: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  pressionado: {
    opacity: 0.5,
  },
  excluir: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  fundoModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  areaFechar: {
    flex: 1,
  },
  painelModal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  tituloModal: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  opcaoModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textoOpcao: {
    fontSize: 16,
  },
  textoOpcaoSelecionada: {
    fontWeight: 'bold',
  },
  cancelarModal: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 4,
  },
});
