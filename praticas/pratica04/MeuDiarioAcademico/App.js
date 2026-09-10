import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  BUTTON_LABEL,
  LIST_TITLE,
  SWITCH_LABEL,
} from './labels';

// Lista estática (array fixo em JS): o foco desta atividade é o layout e os
// componentes, não o gerenciamento de estado da lista em si.
const disciplinas = [
  { id: '1', nome: 'Programação para Dispositivos Móveis', obrigatoria: true },
  { id: '2', nome: 'Engenharia de Software', obrigatoria: true },
  { id: '3', nome: 'Libras', obrigatoria: false },
  { id: '4', nome: 'Tópicos Avançados em Web', obrigatoria: false },
];

export default function App() {
  // Estado apenas do campo de texto (componente controlado) e do switch.
  // A lista em si permanece estática, conforme pedido no enunciado.
  const [novaDisciplina, setNovaDisciplina] = useState('');
  const [somenteObrigatorias, setSomenteObrigatorias] = useState(false);

  function handleAdicionar() {
    if (!novaDisciplina.trim()) return;
    // Ainda sem persistir na lista (que é estática) — apenas demonstra a
    // captura do texto digitado e a resposta do botão ao toque.
    Alert.alert('Disciplina digitada', novaDisciplina.trim());
    setNovaDisciplina('');
  }

  // "Mostrar apenas obrigatórias" ainda sem filtro real, apenas o controle
  // visual (Switch), conforme desafio opcional.
  const listaExibida = somenteObrigatorias
    ? disciplinas.filter((d) => d.obrigatoria)
    : disciplinas;

  return (
    <SafeAreaProvider>
      {/* SafeAreaView (react-native-safe-area-context) evita que o conteúdo
          fique atrás do notch/barra de status do aparelho. */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* ---------- Cabeçalho ---------- */}
          <View style={styles.header}>
            <Text style={styles.title}>{APP_TITLE}</Text>
          </View>

          {/* ---------- Linha de cadastro (row) ---------- */}
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              placeholder={INPUT_PLACEHOLDER}
              value={novaDisciplina}
              onChangeText={setNovaDisciplina}
            />
            <Pressable
              // Pressable no lugar de Button para poder estilizar o estado
              // "pressionado" (desafio opcional).
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleAdicionar}
            >
              <Text style={styles.buttonText}>{BUTTON_LABEL}</Text>
            </Pressable>
          </View>

          {/* ---------- Switch (desafio opcional, sem filtro real) ---------- */}
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{SWITCH_LABEL}</Text>
            <Switch
              value={somenteObrigatorias}
              onValueChange={setSomenteObrigatorias}
            />
          </View>

          {/* ---------- Lista ---------- */}
          <Text style={styles.listTitle}>{LIST_TITLE}</Text>
          <View style={styles.list}>
            {listaExibida.map((disciplina) => (
              <View key={disciplina.id} style={styles.item}>
                <Text style={styles.itemText}>{disciplina.nome}</Text>
                <Text
                  style={[
                    styles.badge,
                    disciplina.obrigatoria ? styles.badgeObrigatoria : styles.badgeEletiva,
                  ]}
                >
                  {disciplina.obrigatoria ? 'Obrigatória' : 'Eletiva'}
                </Text>
              </View>
            ))}
          </View>

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  container: {
    // flex: 1 faz o container ocupar toda a tela disponível, permitindo que
    // a lista mais abaixo cresça naturalmente no espaço restante.
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 16,
    // alignItems: 'center' centraliza o título horizontalmente, dando
    // destaque ao nome do app no topo da tela.
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f3542',
  },
  formRow: {
    flexDirection: 'row',
    // alignItems: 'center' alinha input e botão verticalmente no meio da
    // linha, já que o botão tem altura diferente do input.
    alignItems: 'center',
    // justifyContent: 'space-between' garante um espaçamento consistente
    // entre o input e o botão, mesmo em telas de larguras diferentes.
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    // Largura percentual: o input ocupa ~70% da linha, deixando o restante
    // para o botão "Adicionar".
    width: '70%',
    borderWidth: 1,
    borderColor: '#ced6e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    // flex ocupa o espaço restante da linha (~28-30%) sem precisar de um
    // valor fixo em pixels, se adaptando a diferentes telas.
    flex: 0.28,
    backgroundColor: '#3742fa',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    // Feedback visual do Pressable ao ser tocado.
    backgroundColor: '#2f36d1',
    opacity: 0.85,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // Título à esquerda e switch à direita, com espaço entre eles.
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 14,
    color: '#57606f',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2f3542',
  },
  list: {
    // flex: 1 permite que a lista preencha o espaço restante da coluna
    // (abaixo do cabeçalho, formulário e switch).
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    // Nome da disciplina à esquerda e a etiqueta (badge) à direita.
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 14,
    margin: 6,
    marginHorizontal: 0,
    marginBottom: 10,
    borderRadius: 8,
    // Sombra leve só no Android para destacar cada card da lista.
    elevation: 1,
  },
  itemText: {
    fontSize: 15,
    color: '#2f3542',
    flexShrink: 1,
    marginRight: 8,
  },
  badge: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  badgeObrigatoria: {
    backgroundColor: '#eafff1',
    color: '#2ed573',
  },
  badgeEletiva: {
    backgroundColor: '#fff6e0',
    color: '#ffa502',
  },
});
