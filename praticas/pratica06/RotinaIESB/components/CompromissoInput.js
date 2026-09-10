import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

// Componente controlado (Aula 05: props entre pai e filho): value,
// onChangeText e onAdd vêm do App.js — este componente não guarda
// estado próprio do texto digitado. "labels" chega como prop pra
// reaproveitar os textos de labels.js sem duplicar import.
function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />
      <Pressable
        // Pressable (não Button) pra poder usar android_ripple e um
        // estilo de "pressionado" simples (Aula 06).
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        android_ripple={{ color: '#2f36d1' }}
        onPress={onAdd}
      >
        <Text style={styles.buttonText}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

export default CompromissoInput;

const styles = StyleSheet.create({
  row: {
    // flexDirection: 'row' -> input e botão lado a lado (Aula 04)
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    // Largura percentual explícita (Aula 04): input ocupa ~68% da linha,
    // deixando o restante para o botão.
    width: '68%',
    borderWidth: 1,
    borderColor: '#ced6e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    // flex ocupa o espaço restante (~28-30%) sem valor fixo em pixels
    // (Aula 04: uso de flex).
    flex: 0.28,
    backgroundColor: '#3742fa',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
