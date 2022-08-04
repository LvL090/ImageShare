import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Plataform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import logo from './assets/logo.png'

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Se requiere permiso para acceder a la ubicación de la cámara');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };
  
  let openShareDialogAsync = async () => {    
    if (Platform.OS === 'web') {
      alert('Oh,no está disponible en esta plataforma');
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }; 
    if (selectedImage !== null) {
      return (
        <View style={styles.container}>
          <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
          <TouchableOpacity onPress={openShareDialogAsync } style={styles.button}>
            <Text style={styles.buttonText}>Compartir esta foto</Text>
          </TouchableOpacity>
        </View>
      );
    }
  
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instructions}>
      Para compartir una foto desde tú teléfono,presiona el botón de abajo.
      </Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Escoge una foto</Text>
      </TouchableOpacity>
    </View>
    
  );
}


const styles = StyleSheet.create({
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 120,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  } 
});
