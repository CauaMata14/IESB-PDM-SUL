import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getDataFormatada } from '../../util/data';

export default function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  function editarDespesa() {
    navigation.navigate('GerenciarDespesa', { despesaId: id });
  }

  return (
    <Pressable
      onPress={editarDespesa}
      style={({ pressed }) => pressed && styles.pressionado}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <View style={styles.linhaDetalhes}>
            <Text style={styles.data}>{getDataFormatada(data)}</Text>
            <Text style={styles.categoria}>{categoria}</Text>
          </View>
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressionado: {
    opacity: 0.75,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#3e04c3',
    borderRadius: 8,
    elevation: 3,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  descricao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  linhaDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  data: {
    color: '#e4d9fd',
    marginRight: 8,
  },
  // Tag que destaca a categoria: fundo cinza claro e bordas arredondadas
  categoria: {
    backgroundColor: '#e5e5e5',
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  valorContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 90,
    alignItems: 'center',
  },
  valor: {
    color: '#3e04c3',
    fontWeight: 'bold',
  },
});
