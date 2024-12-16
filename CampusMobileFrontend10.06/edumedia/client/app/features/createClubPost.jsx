import React, { useState } from 'react';
import { TextInput, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import SkeletonDiv from '../../components/SkeletonDiv';
import ImagePickerService from '../../shared/ImagePicker';
import TakePhotoService from '../../shared/TakePhoto';
import { Image } from 'expo-image';
import CustomButton from '../../components/CustomButton';
import { useAddMutate } from '../../hooks/useGenericMutateHook';
import { useSelector } from 'react-redux';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomDialog from '../../components/CustomDialog';
import { TextLabel } from '../../components/Texts';
function CreateClubPost() {
    const { user } = useSelector(state => state.user)
    const [content, setContent] = useState(null)
    const { mutate, isPending } = useAddMutate();
    const [modalVisible, setModalVisible] = useState(false)
    const { clubId } = useLocalSearchParams();


    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const addImage = (filename) => {
        if (filename) {
            setImages([...images, filename]);

            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        }
    };

    const removeImage = (filename) => {
        setImages(images.filter(image => image !== filename));
    };

    const handleCreatePost = () => {

        const postData = {
            endpoint: `/api/ClubPost?clubId=${clubId}`,
            key: ["posts", "trendingtags",`${clubId}Club`],
            data: {
                images: images ? images : [],
                content: content
            }
        }
        if (content && content !== "") {
            mutate(postData)
        }
    }

    return (
        <SkeletonDiv>
            <View style={{ width: '100%', height: 'auto', paddingVertical: 8, flexDirection: 'column', gap: 8 }}>
                <View style={{ width: '100%', height: 'auto', position: 'relative', borderWidth: 0.4, borderRadius: 10, borderColor: 'gray', padding: 8 }}>
                    <TextInput
                        onChangeText={(value) => setContent(value)}
                        multiline
                        placeholder="Tell something for the club ?"
                        placeholderTextColor={"white"}
                        style={{ width: '100%', height: 'auto', maxHeight: 300, color: 'white', padding: 4, justifyContent: 'flex-start', alignItems: 'flex-start' }}
                    />
                    {images.length > 0 && (
                        <ScrollView horizontal style={{ flexDirection: 'row', gap: 8, padding: 8 }}>
                            {
                                images.map((image, index) => (
                                    <View key={index} style={{ position: 'relative', marginLeft: 8 }}>
                                        <Image
                                            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${image}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                                            style={{ width: 150, height: 150, borderRadius: 10 }}
                                        />
                                        <TouchableOpacity style={{ position: 'absolute', top: 5, left: 5 }} onPress={() => removeImage(image)}>
                                            <Image
                                                style={{ width: 26, height: 26, backgroundColor: 'white', borderRadius: 10 }}
                                                source={require('../../assets/icons/trash.svg')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                        </ScrollView>
                    )}
                </View>
                <TouchableOpacity style={{ borderWidth: 0.4, borderColor: 'gray', borderRadius: 10, padding: 8, justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                    <TextLabel color={'gray'}>Add Profile Picture</TextLabel>
                </TouchableOpacity>
                {
                    isPending ?
                        <ActivityIndicator size={'small'} />
                        :
                        <CustomButton
                            text={"Create Club Post"}
                            spinner={false}
                            onClick={() => handleCreatePost()}
                        />
                }
            </View>
            <CustomDialog backgroundColor={"#141218"} visible={modalVisible} isCloseButtonDisplayed={true} onClose={() => setModalVisible(false)}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                    <ImagePickerService setIsLoading={setIsLoading} isLoading={isLoading} setImageName={(data) => addImage(data)} />
                    <TakePhotoService setIsLoading={setIsLoading} isLoading={isLoading} setImageName={(data) => addImage(data)} />
                </View>
            </CustomDialog>
        </SkeletonDiv>
    );
}

export default CreateClubPost;
