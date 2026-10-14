import { Pressable, StyleSheet, Text, View } from 'react-native';

// Botões (Pressable) lado a lado para escolher uma categoria.
// Usado no formulário (seleção) e nas telas de listagem (filtro).
export default function CategoriaSeletor({ opcoes, selecionada, onSelecionar }) {
  return (
    <View style={styles.container}>
      {opcoes.map((opcao) => {
        const ativa = opcao === selecionada;
        return (
          <Pressable
            key={opcao}
            onPress={() => onSelecionar(opcao)}
            style={({ pressed }) => [
              styles.opcao,
              ativa && styles.opcaoAtiva,
              pressed && styles.pressionado,
            ]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{opcao}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3e04c3',
    backgroundColor: '#ffffff',
  },
  opcaoAtiva: {
    backgroundColor: '#3e04c3',
  },
  pressionado: {
    opacity: 0.5,
  },
  texto: {
    color: '#3e04c3',
    fontSize: 13,
  },
  textoAtivo: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
