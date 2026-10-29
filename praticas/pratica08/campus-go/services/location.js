import * as Location from 'expo-location';

// Pede permissão de localização em primeiro plano e devolve um resumo do
// lugar atual. Se a permissão for negada, devolve null em vez de lançar erro,
// para a tela decidir o que mostrar (ex.: um Alert) sem quebrar.
export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const position = await Location.getCurrentPositionAsync({});
  const [address] = await Location.reverseGeocodeAsync({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  });

  const label = address
    ? [address.street, address.city, address.region].filter(Boolean).join(', ')
    : `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;

  return { label, coords: position.coords };
}
