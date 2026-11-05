import * as ImagePicker from 'expo-image-picker';

// As duas funções devolvem sempre o mesmo formato, para a tela não precisar
// tratar galeria e câmera de jeitos diferentes:
// { granted, canAskAgain, uri } — uri fica null se a permissão foi negada
// ou se o usuário cancelou a escolha/captura.

export async function pickImage() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    return { granted: false, canAskAgain: permission.canAskAgain, uri: null };
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (result.canceled) {
    return { granted: true, uri: null };
  }

  return { granted: true, uri: result.assets[0].uri };
}

export async function takePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    return { granted: false, canAskAgain: permission.canAskAgain, uri: null };
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (result.canceled) {
    return { granted: true, uri: null };
  }

  return { granted: true, uri: result.assets[0].uri };
}
