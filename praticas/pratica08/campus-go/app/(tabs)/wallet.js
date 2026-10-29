import { FlatList, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Wallet() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  async function handleShare() {
    await Share.share({
      message: `Gastei R$ ${total.toFixed(2)} neste semestre.`,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bolso</Text>
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <Pressable style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Compartilhar resumo</Text>
      </Pressable>

      <FlatList
        style={styles.list}
        data={expenses}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma despesa cadastrada ainda.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.description}</Text>
            <Text style={styles.rowAmount}>R$ {item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4C6FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowText: {
    color: '#222',
  },
  rowAmount: {
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 24,
  },
});
