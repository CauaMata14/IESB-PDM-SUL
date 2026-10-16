import { StyleSheet, Text, View, useColorScheme } from 'react-native';

import { getThemeColors } from '../../constants/theme';

const LIMITE_ALERTA = 200;

export default function DespesaSumario({ expenses, periodo }) {
  const scheme = useColorScheme();
  const colors = getThemeColors(scheme);

  const somaDespesas = expenses.reduce(
    (acumulador, item) => acumulador + item.amount,
    0
  );
  const quantidade = expenses.length;

  // Valor em vermelho quando o total passa de R$ 200,00
  const acimaDoLimite = somaDespesas > LIMITE_ALERTA;

  return (
    <View style={[styles.container, { backgroundColor: colors.primarySoft }]}>
      <View>
        <Text style={[styles.periodo, { color: colors.primary }]}>{periodo}</Text>
        <Text style={[styles.quantidade, { color: colors.textMuted }]}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text
        style={[styles.soma, { color: acimaDoLimite ? colors.error : colors.primary }]}
      >
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
    marginHorizontal: 4,
    marginBottom: 6,
    borderRadius: 6,
  },
  periodo: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  quantidade: {
    fontSize: 12,
    marginTop: 2,
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
