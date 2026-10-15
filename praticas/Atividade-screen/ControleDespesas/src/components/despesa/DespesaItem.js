import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useThemeColors } from '../../hooks/useThemeColors';
import { getDataFormatada } from '../../util/data';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const colors = useThemeColors();

  function editarDespesa() {
    navigation.navigate('GerenciarDespesa', { expenseId: id });
  }

  return (
    <Pressable
      onPress={editarDespesa}
      style={({ pressed }) => pressed && styles.pressionado}
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.info}>
          <Text style={[styles.descricao, { color: colors.text }]}>{description}</Text>
          <View style={styles.linhaDetalhes}>
            <Text style={[styles.data, { color: colors.textMuted }]}>
              {getDataFormatada(date)}
            </Text>
            {/* Tag que destaca a categoria */}
            <Text
              style={[
                styles.categoria,
                { backgroundColor: colors.tagBackground, color: colors.tagText },
              ]}
            >
              {category}
            </Text>
          </View>
        </View>
        <View style={[styles.valorContainer, { backgroundColor: colors.primarySoft }]}>
          <Text style={[styles.valor, { color: colors.primary }]}>
            R$ {amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressionado: {
    opacity: 0.75,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 8,
    // Sombra adaptada por plataforma
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  linhaDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  data: {
    marginRight: 8,
  },
  categoria: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  valorContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 90,
    alignItems: 'center',
  },
  valor: {
    fontWeight: 'bold',
  },
});
