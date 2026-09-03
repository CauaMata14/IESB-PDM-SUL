import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

// FlatList em vez de ScrollView: só renderiza os itens visíveis na tela,
// o que importa quando a lista de metas crescer (enunciado, item E).
function MetaList({ metas, onDelete, onToggleConcluida }) {
  if (metas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.item}>
          {/* Tocar no texto alterna concluída/pendente (desafio opcional) */}
          <Pressable
            style={styles.itemContent}
            android_ripple={{ color: '#dbe4ff' }}
            onPress={() => onToggleConcluida(item.id)}
          >
            <Text
              style={[styles.itemText, item.concluida && styles.itemTextConcluida]}
            >
              {item.texto}
            </Text>
          </Pressable>

          {/* Botão separado pra remover — evita Pressable aninhado dentro
              de Pressable, que causa conflito de toque. */}
          <Pressable
            style={styles.deleteButton}
            android_ripple={{ color: '#ffd2d2', borderless: true }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

export default MetaList;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden', // mantém o ripple dentro do borderRadius
    elevation: 1,
  },
  itemContent: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  itemText: {
    fontSize: 15,
    color: '#2f3542',
  },
  itemTextConcluida: {
    textDecorationLine: 'line-through',
    color: '#a4b0be',
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  deleteButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: '#a4b0be',
    fontSize: 14,
  },
});
