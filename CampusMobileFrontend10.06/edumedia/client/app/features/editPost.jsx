import React, { useState, useEffect } from 'react';
import { TextInput, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import SkeletonDiv from '../../components/SkeletonDiv';
import ImagePickerService from '../../shared/ImagePicker';
import TakePhotoService from '../../shared/TakePhoto';
import { Image } from 'expo-image';
import CustomButton from '../../components/CustomButton';
import { useUpdateMutate } from '../../hooks/useGenericMutateHook';
import { useSelector } from 'react-redux';
import CustomDialog from '../../components/CustomDialog';
import { TextLabel } from '../../components/Texts';
import { useGenericQueryHook } from '../../hooks/useGenericQueryHook';

function EditPost() {
    const { user } = useSelector(state => state.user);
    const { postId } = useLocalSearchParams(); // postId'yi URL parametresinden alın
    const { data: post, isLoading: isPostLoading } = useGenericQueryHook(`/api/Post/GetPostById?id=${postId}`, `${postId}Post`);
    
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const { mutate, isPending } = useUpdateMutate();
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (post) {
            setContent(post?.data?.data?.content);
            setImages(post?.data?.data?.images);
        }
    }, [post]);

    const addImage = (filename) => {
        if (filename) {
            setImages([...images, filename]);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const removeImage = (filename) => {
        setImages(images.filter(image => image !== filename));
    };

    const handleUpdatePost = () => {
        const postData = {
            endpoint: `/api/Post/UpdatePost?postId=${postId}`,
            key: ["posts", "trendingtags"],
            data: {
                images: images?.length > 0 ? images : null,
                content: content,
            },
        };

        if (content && content !== "") {
            mutate(postData);
        } else {
            Alert.alert("Content cannot be empty");
        }
    };

    if (isPostLoading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <SkeletonDiv>
            <View style={{ width: '100%', height: 'auto', paddingVertical: 8, flexDirection: 'column', gap: 8 }}>
                <View style={{ width: '100%', height: 'auto', position: 'relative', borderWidth: 0.4, borderRadius: 10, borderColor: 'gray', padding: 8 }}>
                    <TextInput
                        value={content}
                        onChangeText={(value) => setContent(value)}
                        multiline
                        placeholder={content}
                        placeholderTextColor={"white"}
                        style={{ width: '100%', height: 'auto', maxHeight: 300, color: 'white', padding: 4, justifyContent: 'flex-start', alignItems: 'flex-start' }}
                    />
                    {images?.length > 0 && (
                        <ScrollView horizontal style={{ flexDirection: 'row', gap: 8, padding: 8 }}>
                            {images.map((image, index) => (
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
                    <TextLabel color={'gray'}>Add Picture</TextLabel>
                </TouchableOpacity>
                {
                    isPending ?
                        <ActivityIndicator size={'small'} />
                        :
                        <CustomButton
                            text={"Update Post"}
                            spinner={false}
                            onClick={() => handleUpdatePost()}
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

export default EditPost;
