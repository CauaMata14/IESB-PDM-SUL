import { Platform } from 'react-native';

let handlerConfigured = false;

// expo-notifications é importado dinamicamente (só quando alguém de fato
// pede um lembrete), nunca no topo do módulo: no Android, o próprio arquivo
// nativo da biblioteca (TopicSubscriptionModule.android.js) chama
// requireNativeModule('ExpoTopicSubscriptionModule') fora de qualquer
// função — e esse módulo não existe no Expo Go (SDK 53+ removeu push). Um
// import estático aqui faria o Expo Router derrubar a rota inteira (e a
// tela ficar preta) assim que ele avaliasse app/(tabs)/tasks.js.
async function loadNotifications() {
  return import('expo-notifications');
}

function ensureHandlerConfigured(Notifications) {
  if (handlerConfigured) {
    return;
  }
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch (error) {
    console.warn('Não foi possível configurar o handler de notificações:', error);
  }
  handlerConfigured = true;
}

async function ensureAndroidChannel(Notifications) {
  if (Platform.OS !== 'android') {
    return;
  }
  await Notifications.setNotificationChannelAsync('default', {
    name: 'CampusGo',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

// Agenda um lembrete local em `seconds` segundos. Devolve false (sem lançar
// erro) quando a permissão é negada ou quando o recurso simplesmente não
// está disponível neste ambiente (ex.: Expo Go no Android), para a tela
// avisar o usuário em vez de quebrar.
export async function scheduleReminder(title, seconds) {
  try {
    const Notifications = await loadNotifications();

    ensureHandlerConfigured(Notifications);

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }

    await ensureAndroidChannel(Notifications);

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
  } catch (error) {
    console.warn('Não foi possível agendar o lembrete:', error);
    return false;
  }
}
