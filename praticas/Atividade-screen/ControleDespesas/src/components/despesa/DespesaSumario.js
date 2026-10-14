import { StyleSheet, Text, View } from 'react-native';

const LIMITE_ALERTA = 200;

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + item.valor,
    0
  );

  // Bônus: valor em vermelho quando o total passa de R$ 200,00
  const acimaDoLimite = somaDespesas > LIMITE_ALERTA;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, acimaDoLimite && styles.somaAlerta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e4d9fd',
    borderRadius: 6,
  },
  periodo: {
    fontSize: 13,
    color: '#5721d4',
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3e04c3',
  },
  somaAlerta: {
    color: '#d32f2f',
  },
});
