import * as FileSystem from 'expo-file-system';
import { firebase } from '../utils/firebaseConfig';
import { Alert } from 'react-native';

export const UploadAndSetImageToFirebase = async (imageData) => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(imageData);
        const { uri } = fileInfo;
        if (!uri) {
            throw new Error('URI bilgisi alınamadı');
        }
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.onerror = (e) => {
                reject(new TypeError('İstek Başarısız Oldu'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        const filename = imageData.substring(imageData.lastIndexOf('/') + 1);
        const storageRef = firebase.storage().ref().child(`images/${filename}`);
        await storageRef.put(blob);
        blob.close();
        return filename;
    } catch (error) {
        console.error('Fotoğraf yükleme sırasında bir hata oluştu:', error);
        Alert.alert('Error', 'Fotoğraf yükleme sırasında bir hata oluştu, tekrar deneyin');
        return null;
    }
};
