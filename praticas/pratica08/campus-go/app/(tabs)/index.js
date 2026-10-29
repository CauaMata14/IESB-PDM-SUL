import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';
import { api } from '../../services/api';

export default function Inicio() {
  const { notices, isLoading, error, reload } = useNotices();
  const [refreshing, setRefreshing] = useState(false);
  const [creating, setCreating] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  }

  // Bônus: o JSONPlaceholder responde com um id, mas não grava de verdade.
  async function handleCreateNotice() {
    setCreating(true);
    try {
      const created = await api.create('posts', {
        title: 'Aviso criado pelo CampusGo',
        body: 'Mensagem de teste enviada pelo app.',
        userId: 1,
      });
      Alert.alert('Aviso criado', `A API respondeu com o id ${created.id}.`);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível criar o aviso.');
    } finally {
      setCreating(false);
    }
  }

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4C6FFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.button} onPress={reload}>
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListHeaderComponent={
        <Pressable
          style={[styles.button, styles.createButton]}
          onPress={handleCreateNotice}
          disabled={creating}
        >
          <Text style={styles.buttonText}>
            {creating ? 'Criando...' : 'Criar aviso'}
          </Text>
        </Pressable>
      }
      ListEmptyComponent={
        <View style={styles.center}>
          <Text>Nenhum aviso por aqui ainda.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <FadeIn style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#F3F4FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  cardBody: {
    color: '#444',
    lineHeight: 20,
  },
  errorText: {
    textAlign: 'center',
    color: '#B3261E',
  },
  button: {
    backgroundColor: '#4C6FFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  createButton: {
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
