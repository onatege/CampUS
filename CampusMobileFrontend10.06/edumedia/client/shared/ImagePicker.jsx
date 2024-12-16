import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { CompressImage } from '../utils/compressImage';
import { UploadAndSetImageToFirebase } from '../utils/uploadAndSetImageToFirebase';

export default function ImagePickerService({ setImageName, placeHolder, isLoading, setIsLoading }) {
    const [image, setImage] = useState(null);
    const [imageFromStore, setImageFromStore] = useState(null);

    useEffect(() => {
        if (placeHolder) {
            setImageName(placeHolder);
            setImageFromStore(placeHolder);
        } else {
            setImageName(null);
            setImageFromStore(null);
        }
    }, [placeHolder]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
        });

        console.log(result);

        if (!result.canceled) {
            const compressedImageUri = await CompressImage(result.assets[0].uri);
            setImage(compressedImageUri);
            const filename = await UploadAndSetImageToFirebase(compressedImageUri);
            if (filename) {
                setImageName(filename);
            } else {
                Alert.alert('Error', 'Fotoğraf yükleme sırasında bir hata oluştu, tekrar deneyin');
            }
        }
    };

    return (
        <>
            {
                isLoading ?
                    <TouchableOpacity style={{ height: 50, width: 50, borderWidth: 0.4, borderColor: 'gray', borderRadius: 10, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <ActivityIndicator />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={pickImage} style={{ height: 50, width: 50, borderWidth: 0.4, borderColor: 'gray', borderRadius: 10, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <Image placeholder={require('../assets/icons/image.svg')} contentFit='contain' style={{ width: '50%', height: '50%', borderRadius: 10, padding: 15 }} />
                    </TouchableOpacity>
            }
        </>
    );
}
