import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') {
    return;
  }
  await Notifications.setNotificationChannelAsync('default', {
    name: 'CampusGo',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

// Agenda um lembrete local em `seconds` segundos. Devolve false (sem lançar
// erro) quando a permissão de notificação é negada, para a tela avisar o
// usuário em vez de quebrar.
export async function scheduleReminder(title, seconds) {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    return false;
  }

  await ensureAndroidChannel();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'CampusGo',
      body: title,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
    },
  });

  return true;
}
