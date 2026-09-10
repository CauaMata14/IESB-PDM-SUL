import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  // Controla se o carregamento inicial já terminou. Sem isso, o efeito de
  // salvar dispararia com metas=[] antes de carregar o que já estava salvo,
  // e sobrescreveria os dados do usuário com uma lista vazia (erro comum
  // citado no enunciado).
  const [carregando, setCarregando] = useState(true);

  // ---------- Carrega as metas salvas assim que o app abre ----------
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        console.error('Erro ao carregar metas do AsyncStorage:', erro);
        Alert.alert(
          'Erro ao carregar',
          'Não foi possível carregar suas metas salvas. Tente novamente.'
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarMetas();
  }, []);

  // ---------- Salva as metas sempre que a lista mudar ----------
  useEffect(() => {
    if (carregando) return; // evita sobrescrever o storage antes de carregar

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        console.error('Erro ao salvar metas no AsyncStorage:', erro);
        Alert.alert(
          'Erro ao salvar',
          'Não foi possível salvar suas metas. Verifique o espaço do dispositivo.'
        );
      }
    }
    salvarMetas();
  }, [metas, carregando]);

  function handleAdd() {
    if (!texto.trim()) {
      Alert.alert('Ops!', 'Digite o nome da meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(), // id único e estável — nunca usar o index
      texto: texto.trim(),
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    // Nunca mutar o array (push): sempre criar um novo com spread.
    setMetas((atuais) => [...atuais, novaMeta]);
    setTexto('');
  }

  function handleDelete(id) {
    setMetas((atuais) => atuais.filter((meta) => meta.id !== id));
  }

  function handleToggleConcluida(id) {
    setMetas((atuais) =>
      atuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.length - pendentes;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Metas do Semestre</Text>
            <Text style={styles.counter}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <MetaInput value={texto} onChangeText={setTexto} onAdd={handleAdd} />

          <View style={styles.listWrapper}>
            <MetaList
              metas={metas}
              onDelete={handleDelete}
              onToggleConcluida={handleToggleConcluida}
            />
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerImage: {
    width: 44,
    height: 44,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listWrapper: {
    flex: 1,
  },
});
