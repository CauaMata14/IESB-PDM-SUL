import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

// Componente "burro"/controlado: não guarda estado próprio do texto.
// Quem guarda o estado é o App.js, que passa value/onChangeText/onAdd
// como props (conforme sugerido no enunciado da Atividade 02).
function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Nova meta de estudo..."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />
      <Pressable
        // Pressable (em vez de Button) para poder aplicar android_ripple e
        // um estilo de "pressionado" simples.
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        android_ripple={{ color: '#2f36d1' }}
        onPress={onAdd}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

export default MetaInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced6e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3742fa',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
