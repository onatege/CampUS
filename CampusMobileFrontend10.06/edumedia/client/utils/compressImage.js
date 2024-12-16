import * as ImageManipulator from 'expo-image-manipulator';

export const  CompressImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 400, height: 300 } }],
        { compress: 0.9, format: ImageManipulator.SaveFormat.WEBP }
    );
    return manipResult.uri
}