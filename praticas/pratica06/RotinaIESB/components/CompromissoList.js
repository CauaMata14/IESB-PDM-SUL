import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

// FlatList (desafio O4) em vez de ScrollView + .map: só renderiza os
// itens visíveis, e o ListEmptyComponent cobre a tela vazia sem precisar
// de um if antes do return.
function CompromissoList({ itens, onDelete, onToggleConcluido, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        // key estável baseada no id — nunca o index (Aula 06)
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={itens.length === 0 && styles.emptyContentContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Tocar no texto alterna concluído/pendente (desafio O2) */}
            <Pressable
              style={styles.itemContent}
              android_ripple={{ color: '#dbe4ff' }}
              onPress={() => onToggleConcluido(item.id)}
            >
              <Text
                style={[styles.itemText, item.concluido && styles.itemTextConcluido]}
              >
                {item.texto}
              </Text>
            </Pressable>

            {/* Botão de remover separado do Pressable de cima — evita
                Pressable aninhado dentro de Pressable (conflito de toque).
                Remoção de verdade acontece no onDelete do App.js, via
                .filter() por id (Aula 06). */}
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
    </View>
  );
}

export default CompromissoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3542',
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
  emptyContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#a4b0be',
    fontSize: 14,
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
  itemTextConcluido: {
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
});
