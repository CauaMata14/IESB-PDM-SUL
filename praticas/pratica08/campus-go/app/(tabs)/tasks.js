import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function Tasks() {
  const [place, setPlace] = useState(null);

  async function handleCheckIn() {
    const result = await getCurrentPlace();
    if (!result) {
      Alert.alert(
        'Permissão necessária',
        'Autorize a localização para fazer o check-in.'
      );
      return;
    }
    setPlace(result);
  }

  async function handleRemind() {
    const scheduled = await scheduleReminder(
      'Volte para suas tarefas no CampusGo!',
      10
    );
    if (!scheduled) {
      Alert.alert(
        'Permissão necessária',
        'Autorize as notificações para receber o lembrete.'
      );
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      // Em alguns emuladores a vibração não funciona; a tela segue utilizável.
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <Link href="/new-task" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Nova tarefa</Text>
        </Pressable>
      </Link>

      <Link href="/task/42" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Ver tarefa 42</Text>
        </Pressable>
      </Link>

      <Pressable style={styles.button} onPress={handleCheckIn}>
        <Text style={styles.buttonText}>Estudei aqui</Text>
      </Pressable>
      {place ? <Text style={styles.info}>{place.label}</Text> : null}

      <Pressable style={styles.button} onPress={handleRemind}>
        <Text style={styles.buttonText}>Lembrar em 10 s</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.success]} onPress={handleComplete}>
        <Text style={styles.buttonText}>Concluir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4C6FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  success: {
    backgroundColor: '#2E7D32',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  info: {
    color: '#444',
    paddingHorizontal: 4,
  },
});
