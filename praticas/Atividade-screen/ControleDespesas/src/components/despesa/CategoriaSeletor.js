import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

import { getThemeColors } from '../../constants/theme';

// Chips de categoria lado a lado, usados como filtro acima das listas
export default function CategoriaSeletor({ opcoes, selecionada, onSelecionar }) {
  const scheme = useColorScheme();
  const colors = getThemeColors(scheme);

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
              { borderColor: colors.primary, backgroundColor: colors.card },
              ativa && { backgroundColor: colors.primary },
              pressed && styles.pressionado,
            ]}
          >
            <Text
              style={[
                styles.texto,
                { color: ativa ? colors.onPrimary : colors.primary },
                ativa && styles.textoAtivo,
              ]}
            >
              {opcao}
            </Text>
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
  },
  pressionado: {
    opacity: 0.5,
  },
  texto: {
    fontSize: 13,
  },
  textoAtivo: {
    fontWeight: 'bold',
  },
});
