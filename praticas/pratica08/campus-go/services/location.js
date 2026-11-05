import * as Location from 'expo-location';

const TIMEOUT_MS = 10000;

// Alguns emuladores sem GPS/rede simulados deixam getCurrentPositionAsync
// pendurado para sempre, sem nunca resolver nem rejeitar. Corrida contra um
// timeout garante que a tela sempre receba uma resposta.
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Tempo esgotado ao obter a localização.')), ms)
    ),
  ]);
}

// Pede permissão de localização em primeiro plano e devolve um resumo do
// lugar atual. Devolve null (sem lançar erro) quando a permissão é negada,
// quando o provedor de localização falha (ex.: GPS indisponível no
// emulador) ou quando a resposta demora demais — a tela decide o que
// mostrar (ex.: um Alert) sem quebrar.
export async function getCurrentPlace() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const position = await withTimeout(Location.getCurrentPositionAsync({}), TIMEOUT_MS);
    const [address] = await withTimeout(
      Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
      TIMEOUT_MS
    );

    const label = address
      ? [address.street, address.city, address.region].filter(Boolean).join(', ')
      : `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;

    return { label, coords: position.coords };
  } catch (error) {
    console.warn('Não foi possível obter a localização atual:', error);
    return null;
  }
}
