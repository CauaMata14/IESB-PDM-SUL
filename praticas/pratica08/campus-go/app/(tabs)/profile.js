import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function Profile() {
  const [photoUri, setPhotoUri] = useState(null);

  // Relê a foto salva sempre que a tela abre, para ela sobreviver ao
  // fechamento do app.
  useEffect(() => {
    async function loadPhoto() {
      const saved = await AsyncStorage.getItem(PHOTO_KEY);
      if (saved) {
        setPhotoUri(saved);
      }
    }
    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    setPhotoUri(uri);
    await AsyncStorage.setItem(PHOTO_KEY, uri);
  }

  function alertCameraBlocked() {
    Alert.alert(
      'Câmera bloqueada',
      'Não foi possível acessar a câmera. Você pode liberar o acesso nos ajustes do sistema.',
      [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );
  }

  async function handlePickFromGallery() {
    const result = await pickImage();
    if (!result.granted) {
      Alert.alert(
        'Permissão necessária',
        'Autorize o acesso à galeria para trocar a foto.'
      );
      return;
    }
    if (result.uri) {
      await savePhoto(result.uri);
    }
  }

  async function handleTakePhoto() {
    const result = await takePhoto();
    if (!result.granted) {
      alertCameraBlocked();
      return;
    }
    if (result.uri) {
      await savePhoto(result.uri);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Pressable onPress={handlePickFromGallery}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.placeholderText}>Toque para escolher{'\n'}uma foto</Text>
          </View>
        )}
      </Pressable>

      <Pressable style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Tirar foto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E6E9F5',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#4C6FFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
