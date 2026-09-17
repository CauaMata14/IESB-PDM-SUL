import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import {
  tituloApp,
  placeholderCompromisso,
  botaoAdicionar,
  tituloLista,
  listaVazia,
} from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  // useState do texto digitado e do array de compromissos (Aula 05).
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  // Controla se a carga inicial já terminou. Sem isso, o efeito de salvar
  // dispararia com compromissos=[] antes de carregar o que já estava
  // salvo, e sobrescreveria os dados do usuário com uma lista vazia
  // (erro comum listado no enunciado, item 12).
  const [carregando, setCarregando] = useState(true);

  // ---------- useEffect de CARGA (Aula 06) ----------
  // Roda uma única vez, quando o app abre (array de dependências []),
  // lê a chave do AsyncStorage e usa JSON.parse pra transformar a string
  // salva de volta em array de objetos.
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        console.error('Erro ao carregar compromissos do AsyncStorage:', erro);
        Alert.alert(
          'Erro ao carregar',
          'Não foi possível carregar seus compromissos salvos.'
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarCompromissos();
  }, []);

  // ---------- useEffect de SALVAMENTO (Aula 06) ----------
  // Roda toda vez que "compromissos" muda (adicionar, remover ou marcar
  // como concluído), usando JSON.stringify pra converter o array em
  // string antes de gravar na mesma chave.
  useEffect(() => {
    if (carregando) return; // evita sobrescrever o storage antes da carga

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        console.error('Erro ao salvar compromissos no AsyncStorage:', erro);
        Alert.alert(
          'Erro ao salvar',
          'Não foi possível salvar seus compromissos. Verifique o espaço do dispositivo.'
        );
      }
    }
    salvarCompromissos();
  }, [compromissos, carregando]);

  function handleAdd() {
    if (!texto.trim()) {
      Alert.alert('Ops!', 'Digite o compromisso antes de adicionar.');
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(), // id único e estável — nunca o index
      texto: texto.trim(),
      criadoEm: new Date().toISOString(),
      concluido: false, // desafio O2
    };

    // Nunca mutar o array (push/splice): sempre criar um novo via spread.
    setCompromissos((atuais) => [...atuais, novoCompromisso]);
    setTexto('');
  }

  function handleDelete(id) {
    // Remoção com .filter() por id (Aula 06) — nunca por index.
    setCompromissos((atuais) => atuais.filter((item) => item.id !== id));
  }

  function handleToggleConcluido(id) {
    setCompromissos((atuais) =>
      atuais.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  }

  // Desafio O3: contador de pendentes no cabeçalho.
  const pendentes = compromissos.filter((item) => !item.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* ---------- Cabeçalho (linha: logo + título) ---------- */}
        <View style={styles.header}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{tituloApp}</Text>
            <Text style={styles.counter}>{pendentes} pendentes</Text>
          </View>
        </View>

        {/* ---------- Formulário (linha: input + botão) ---------- */}
        <View style={styles.formContainer}>
          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={handleAdd}
            labels={{ placeholderCompromisso, botaoAdicionar }}
          />
        </View>

        {/* ---------- Lista (flex: 1 -> ocupa o resto da tela) ---------- */}
        <View style={styles.listContainer}>
          <CompromissoList
            itens={compromissos}
            onDelete={handleDelete}
            onToggleConcluido={handleToggleConcluido}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
          />
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
  header: {
    // flexDirection: 'row' -> logo e texto lado a lado (Aula 04)
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f3542',
  },
  counter: {
    fontSize: 13,
    color: '#57606f',
    marginTop: 2,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  listContainer: {
    // flex: 1 faz a área da lista ocupar todo o espaço restante da tela,
    // abaixo do cabeçalho e do formulário (Aula 04: uso de flex).
    flex: 1,
    paddingHorizontal: 20,
  },
});
